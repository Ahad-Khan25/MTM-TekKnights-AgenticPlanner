"""Validator: six independent checks on a plan, plus every structured rule from the messages mapped onto plan fields."""
import math
from planner import derived, headcount_fed, rules, num, t2m, windows, total_minutes

APPLIED = {"features", "capacity_buffer_pct", "forbid_window", "reserve_pct", "tax_pct", "total_min", "minutes_per_team",
           "max_teams_per_judge", "start_time", "end_time", "opening_min", "closing_min"}  # enforced inside the planner


def metrics(p):
    v, s, f, j, b = (p.get(k) or {} for k in ("venue", "schedule", "food", "judging", "budget"))
    ch = v.get("chosen") or {}
    return {"venue.capacity": ch.get("capacity"), "venue.price": ch.get("price"), "food.boxes": f.get("boxes"),
            "food.cost": f.get("cost"), "food.unit_price": f.get("unit_price"), "schedule.prayer_min": s.get("prayer_min"),
            "schedule.lunch_min": s.get("lunch_min"), "schedule.total_min": s.get("total_min"),
            "judging.judges_used": j.get("judges_used"), "budget.total": b.get("total"), "budget.remaining": b.get("remaining")}


def rule_ok(r, val):
    x = r.get("value")
    if r["op"] == "min": return num(val) >= num(x)
    if r["op"] == "max": return num(val) <= num(x)
    if r["op"] == "equals": return num(val) == num(x) if num(x) is not None else str(val) == str(x)
    return True


def validate(F, p, log):
    d, J, V, S, Fd, B = derived(F), p["judging"], p["venue"], p["schedule"], p["food"], p["budget"]
    fed = headcount_fed(d, J)
    checks = []

    def add(name, ok, detail):
        checks.append({"name": name, "ok": bool(ok), "detail": detail})

    # 1 figures
    ok = bool(d["teams"] and d["team_size"] and d["max_teams_per_judge"]
              and d["teams"] == math.ceil(d["students"] / d["team_size"])
              and d["judges_needed"] == math.ceil(d["teams"] / d["max_teams_per_judge"])
              and V["headcount"] == fed == Fd.get("headcount") and Fd.get("boxes", 0) >= fed)
    add("Figures correct & consistent", ok, f"teams={d['teams']}, judges needed={d['judges_needed']}, people to feed={fed}, "
        f"boxes={Fd.get('boxes')}" + ("" if Fd.get("boxes", 0) >= fed else f"  << boxes {Fd.get('boxes')} < {fed} people"))
    # 2 budget
    add("Within budget", B["total"] <= B["available"] and B["available"] > 0,
        f"total Rs {B['total']:,.0f} vs available Rs {B['available']:,.0f} (remaining Rs {B['remaining']:,.0f})")
    # 3 venue
    ch = V.get("chosen")
    add("Venue fits & meets rules", ch and ch["capacity"] >= V["required_capacity"],
        f"{ch['name']} cap {ch['capacity']:.0f} >= {V['required_capacity']}" if ch else "NO compliant venue: " + "; ".join(r["venue"] + ": " + r["reason"] for r in V["rejected"]))
    # 4 schedule
    bl, L, err = S.get("blocks", []), total_minutes(F), S.get("error")
    if not err:
        contiguous = all(bl[i]["end"] == bl[i + 1]["start"] for i in range(len(bl) - 1))
        length = sum(b["min"] for b in bl)
        pr_need = num(next((r.get("value") for r in rules(F) if r["field"] == "prayer_min"), 0)) or 0
        pr = sum(b["min"] for b in bl if "Prayer" in b["name"])
        jb = [b for b in bl if b["name"] == "Judging"]
        clash = [w for w in windows(F) for b in jb if t2m(b["start"]) < w[1] and t2m(b["end"]) > w[0]]
        jfit = bool(jb) and jb[0]["min"] >= J["max_teams_assigned"] * (d["minutes_per_team"] or 0)
        win = (not ch or not ch.get("close") or t2m(S["end"]) <= t2m(ch["close"])) and (not ch or not ch.get("open") or t2m(S["start"]) >= t2m(ch["open"]))
        bad = [n for n, c in [("length", length == L), ("contiguous/no overlap", contiguous), ("prayer", pr >= pr_need),
                              ("judging fits", jfit), ("forbidden window", not clash), ("venue hours", win)] if not c]
        err = ", ".join(bad)
    add("Schedule valid", not err, err or f"{S['start']}-{S['end']} = {L} min, prayer {S['prayer_min']} min, judging {S['judging_min']} min, no overlaps")
    # 5 judges
    add("Enough judges", J["feasible"] and J["max_teams_assigned"] <= (d["max_teams_per_judge"] or 0),
        f"pool {J['pool']:.0f} vs needed {J['judges_needed']}; max {J['max_teams_assigned']} teams/judge" + ("" if J["feasible"] else "  << INFEASIBLE: pool too small"))
    # 6 areas
    add("All five areas present", all(p.get(a) for a in ("venue", "schedule", "food", "judging", "budget")) and bl and ch, "venue, schedule, food, judging, budget")
    # generic structured rules from messages
    m = metrics(p)
    for r in rules(F):
        k = f"{r['area']}.{r['field']}"
        if r["field"] in APPLIED or r["op"] in ("require", "forbid") and r["area"] == "venue" or r["field"] == "boxes" and r["op"] == "equals":
            continue
        if m.get(k) is None:
            log.append(f"rule {k} {r['op']} {r['value']}: no matching plan field; listed for human review")
            continue
        if not rule_ok(r, m[k]):
            idx = {"venue": 2, "schedule": 3, "food": 0, "judging": 4, "budget": 1}.get(r["area"], 0)
            checks[idx]["ok"] = False
            checks[idx]["detail"] += f"  << rule {k} {r['op']} {r.get('value')} violated (plan has {m[k]})"
    return checks
