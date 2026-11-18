"""Planner: plain code, ZERO model calls. One pure function per area + an explicit dependency graph."""
import math, re

ORDER = ["judging", "venue", "schedule", "food", "budget"]
# area -> areas that must be recomputed when it changes
DEPS = {"judging": {"venue", "schedule", "food", "budget"}, "venue": {"schedule", "budget"},
        "schedule": set(), "food": {"budget"}, "budget": set()}
# fact area (store.area_of) -> first area to recompute
FACT_AREAS = {"core": {"judging"}, "judging": {"judging"}, "venue": {"venue"}, "schedule": {"schedule"},
              "food": {"food"}, "budget": {"budget"}, "funding": {"budget"}}
# design defaults for blocks no message specifies (not pack facts; overridden by schedule rules)
BLOCK_DEFAULTS = {"total_min": 240, "opening_min": 15, "lunch_min": 45, "prayer_min": 15, "closing_min": 15, "start_time": "10:00"}


def num(v):
    if isinstance(v, (int, float)):
        return v
    m = re.search(r"-?\d[\d,]*\.?\d*", str(v))
    return float(m.group(0).replace(",", "")) if m else None


def t2m(t):
    m = re.match(r"(\d{1,2}):(\d{1,2})", str(t or ""))
    return int(m.group(1)) * 60 + int(m.group(2)) if m else 0


def m2t(m):
    return f"{m // 60:02d}:{m % 60:02d}"


def of_kind(F, *kinds):
    return [f for f in F.values() if f["kind"] in kinds]


def rules(F):
    return [f["value"] for f in F.values() if f["kind"] in ("judge_rule", "schedule_rule", "hard_rule", "order_change")]


def rule(F, field, ops=("equals", "min", "max")):
    vals = [r.get("value") for r in rules(F) if r["field"] == field and r["op"] in ops]
    return vals[-1] if vals else None


def windows(F):
    return [tuple(t2m(x) for x in str(r["value"]).split("-")) for r in rules(F)
            if r["op"] == "forbid" and re.fullmatch(r"\d{1,2}:\d{2}-\d{1,2}:\d{2}", str(r["value"]).replace(" ", ""))]


def derived(F):
    """Figures every area depends on."""
    heads = of_kind(F, "headcount")
    students = sum(num(f["value"]) for f in heads if "student" in f["key"])
    others = {f["key"]: num(f["value"]) for f in heads if "student" not in f["key"] and f.get("scope") != "subset"}
    staff = sum(num(f["value"]) for f in of_kind(F, "staff_count"))
    ts = of_kind(F, "team_size")
    team_size = num(ts[0]["value"]) if ts else None
    mtj, mpt = num(rule(F, "max_teams_per_judge")), num(rule(F, "minutes_per_team"))
    teams = math.ceil(students / team_size) if students and team_size else None
    need = math.ceil(teams / mtj) if teams and mtj else None
    return {"students": students, "team_size": team_size, "teams": teams, "staff": staff, "other_attendees": others,
            "max_teams_per_judge": mtj, "minutes_per_team": mpt, "judges_needed": need,
            "judge_minutes_total": teams * mpt if teams and mpt else None}


def judging(F, d):
    pool = sum(num(f["value"]) for f in of_kind(F, "judge_pool"))
    need = d["judges_needed"] or 0
    used = int(min(need, pool))
    fee = next((num(f["value"]) for f in of_kind(F, "unit_price") if f.get("scope") == "judge"), 0) or 0
    assign = {f"Judge {j + 1}": [t + 1 for t in range(j, d["teams"] or 0, used)] for j in range(used)} if used else {}
    per = max((len(v) for v in assign.values()), default=0)
    return {"pool": pool, "judges_needed": need, "judges_used": used, "feasible": pool >= need > 0,
            "fee_per_judge": fee, "honoraria": used * fee, "assignment": assign, "max_teams_assigned": per,
            "block_min": int(per * (d["minutes_per_team"] or 0))}


def headcount_fed(d, J):
    return int(d["students"] + d["staff"] + J["judges_used"] + sum(d["other_attendees"].values()))


def venue(F, d, J):
    fed = headcount_fed(d, J)
    buf = num(rule(F, "capacity_buffer_pct")) or 0
    need = math.ceil(fed * (1 + buf / 100))
    feats = [str(x).lower() for r in rules(F) if r["area"] == "venue" and r["op"] == "require" and r.get("value")
             for x in (r["value"] if isinstance(r["value"], list) else [r["value"]])]
    banned = [str(r["value"]).lower() for r in rules(F) if r["area"] == "venue" and r["op"] == "forbid" and r.get("value")]
    min_cap = num(rule(F, "capacity", ("min",))) or 0
    length = total_minutes(F)
    chosen, rejected = None, []
    for f in sorted(of_kind(F, "venue_option"), key=lambda f: num(f["value"].get("price", 0)) or 0):
        v = f["value"]
        cap, price = num(v.get("capacity", 0)) or 0, num(v.get("price", 0)) or 0
        have = " ".join(map(str, v.get("features", []))).lower()
        why = []
        if cap < max(need, min_cap):
            why.append(f"capacity {cap:.0f} < required {max(need, min_cap)} ({fed} people + {buf}% buffer)")
        why += [f"missing required '{x}'" for x in feats if x not in have]
        why += [f"has forbidden '{x}'" for x in banned if x in have]
        if v.get("open") and v.get("close") and length and t2m(v["close"]) - t2m(v["open"]) < length:
            why.append(f"open {v['open']}-{v['close']} shorter than event {length} min")
        if why:
            rejected.append({"venue": f["key"], "reason": "; ".join(why)})
        elif not chosen:
            chosen = {"name": f["key"], "capacity": cap, "price": price, "features": v.get("features", []),
                      "open": v.get("open"), "close": v.get("close"), "msg_id": f["msg_id"]}
    return {"chosen": chosen, "rejected": rejected, "headcount": fed, "required_capacity": max(need, min_cap),
            "required_features": feats}


def total_minutes(F):
    L = num(rule(F, "total_min"))
    return int(L * 60 if L and L <= 24 else L) if L else BLOCK_DEFAULTS["total_min"]


def schedule(F, d, J, V):
    L = total_minutes(F)
    if not L:
        return {"blocks": [], "error": "event length not stated in any message"}
    g = lambda k: int(num(rule(F, k)) or 0) if rule(F, k) is not None else BLOCK_DEFAULTS.get(k, 0)
    prayer, lunch, op, cl, jb = g("prayer_min"), g("lunch_min"), g("opening_min"), g("closing_min"), J["block_min"]
    ch = V.get("chosen") or {}
    lo = max([t2m(x) for x in (rule(F, "start_time", ("min", "equals")), ch.get("open")) if x] or [0])
    hi = min([t2m(x) for x in (rule(F, "end_time", ("max", "equals")), ch.get("close")) if x] or [24 * 60])
    fixed = rule(F, "start_time", ("equals",))
    start = t2m(fixed) if fixed else min(max(t2m(BLOCK_DEFAULTS["start_time"]), lo), hi - L)
    flex = L - (op + lunch + prayer + jb + cl)
    bad = windows(F)
    if flex < 0:
        return {"blocks": [], "error": f"fixed blocks need {L - flex} min > event {L} min"}
    # opening, build, lunch, prayer, build, judging, wrap-up, closing; slide judging earlier only if a window forbids it
    for c in range(0, flex + 1, 5):
        for b in sorted(range(0, flex - c + 1, 5), key=lambda b: abs(b - (flex - c) / 2)):  # balanced build halves first
            parts = [("Opening", op), ("Build (hacking)", flex - c - b), ("Lunch", lunch), ("Prayer break", prayer),
                     ("Build (hacking)", b), ("Judging", jb), ("Wrap-up / results tally", c), ("Closing & awards", cl)]
            blocks, t = [], start
            for name, dur in parts:
                if dur > 0:
                    blocks.append({"name": name, "start": m2t(t), "end": m2t(t + dur), "min": dur})
                    t += dur
            js = next(x for x in blocks if x["name"] == "Judging") if jb else None
            if not js or all(t2m(js["end"]) <= a or t2m(js["start"]) >= z for a, z in bad):
                return {"blocks": blocks, "total_min": L, "start": m2t(start), "end": m2t(start + L), "prayer_min": prayer,
                        "lunch_min": lunch, "judging_min": jb, "forbidden_windows": [f"{m2t(a)}-{m2t(z)}" for a, z in bad]}
    return {"blocks": [], "error": "no judging slot avoids the forbidden time windows"}


def food(F, d, J, downgrade=0):
    fed = headcount_fed(d, J)
    boxes = max(fed, int(num(rule(F, "boxes", ("min",))) or 0))
    override = [f for f in of_kind(F, "order_change") if f["value"].get("field") == "boxes"]
    if override:
        boxes = int(num(override[-1]["value"]["value"]))
    prices = of_kind(F, "unit_price")
    tiers = sorted([f for f in prices if f.get("scope") == "meal" and (num(f["value"]) or 0) > 0],
                   key=lambda f: (0 if "standard" in f["key"] else 1, num(f["value"]) or 0))
    if not tiers:
        return {"boxes": boxes, "headcount": fed, "error": "no meal price stated"}
    i = min(downgrade, len(tiers) - 1)
    tier = tiers[i]
    cost = boxes * num(tier["value"])
    heads = {f["key"]: num(f["value"]) for f in of_kind(F, "headcount")}
    extras = []
    for f in prices:
        if f.get("scope") not in ("meal", "judge", ""):
            qty = heads.get(f["scope"], boxes if f["scope"] == "all" else 0)
            extras.append({"item": f["key"], "qty": qty, "unit": num(f["value"]), "cost": qty * num(f["value"])})
    cost += sum(e["cost"] for e in extras)
    min_cost = num(rule(F, "cost", ("min",))) or 0
    return {"boxes": boxes, "headcount": fed, "tier": tier["key"], "unit_price": num(tier["value"]),
            "price_msg": tier["msg_id"], "extras": extras, "cost": max(cost, min_cost),
            "cheaper_tier_available": i < len(tiers) - 1, "downgrade": downgrade}


def budget(F, J, V, Fd):
    cap = sum(num(f["value"]) for f in of_kind(F, "approved_total_budget"))
    funding = sum(num(f["value"]) for f in of_kind(F, "funding"))
    lines = [("Venue", (V.get("chosen") or {}).get("price", 0)), ("Food", Fd.get("cost", 0)),
             (f"Judge honoraria ({J['judges_used']} x {J['fee_per_judge']:.0f})", J["honoraria"])]
    lines += [(f"Prepaid: {f['key']}", num(f["value"])) for f in of_kind(F, "prepaid_cost")]
    lines += [(f"Approved cost: {f['key']}", num(f["value"])) for f in of_kind(F, "cost")]
    sub = sum(v for _, v in lines)
    tax = num(rule(F, "tax_pct")) or 0
    if tax:
        lines.append((f"Tax {tax}%", sub * tax / 100))
    res = num(rule(F, "reserve_pct")) or 0
    if res:
        lines.append((f"Reserve {res}% of cap", (cap + funding) * res / 100))
    total = sum(v for _, v in lines)
    return {"cap": cap, "funding": funding, "available": cap + funding, "lines": [{"item": k, "amount": v} for k, v in lines],
            "total": total, "remaining": cap + funding - total}


def plan(F, prev=None, areas=None, log=None):
    """Recompute only `areas` (closed over DEPS); reuse the rest from prev. Budget overrun -> downgrade food tier (repair)."""
    areas = set(ORDER) if prev is None or areas is None else closure(areas)
    p = dict(prev or {})
    d = derived(F)
    p["figures"] = d
    if "judging" in areas: p["judging"] = judging(F, d)
    if "venue" in areas: p["venue"] = venue(F, d, p["judging"])
    if "schedule" in areas: p["schedule"] = schedule(F, d, p["judging"], p["venue"])
    if "food" in areas: p["food"] = food(F, d, p["judging"])
    if "budget" in areas: p["budget"] = budget(F, p["judging"], p["venue"], p["food"])
    while p["budget"]["total"] > p["budget"]["available"] and p["food"].get("cheaper_tier_available"):
        p["food"] = food(F, d, p["judging"], p["food"]["downgrade"] + 1)
        p["budget"] = budget(F, p["judging"], p["venue"], p["food"])
        areas |= {"food", "budget"}
        if log is not None:
            log.append(f"repair: over budget, food downgraded to {p['food']['tier']}")
    p["recomputed"] = [a for a in ORDER if a in areas]
    return p


def closure(areas):
    out, todo = set(), list(areas)
    while todo:
        a = todo.pop()
        if a not in out:
            out.add(a)
            todo += DEPS[a]
    return out
