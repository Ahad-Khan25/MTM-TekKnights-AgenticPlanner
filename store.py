"""Fact store: flattening, authority checks, supersede resolution, state persistence (.state/state.json)."""
import hashlib, json, os

STATE = os.path.join(".state", "state.json")

# Which areas each sender role may set. Generic policy, not pack facts. organizer may set anything.
ROLE_AREAS = {"organizer": {"core", "budget", "venue", "food", "judging", "schedule"},
              "finance": {"budget"}, "venue": {"venue"}, "caterer": {"food"}, "judging": {"judging"}, "sponsor": {"funding"}}
KIND_AREA = {"headcount": "core", "team_size": "core", "staff_count": "core", "approved_total_budget": "budget",
             "prepaid_cost": "budget", "cost": "budget", "funding": "funding", "venue_option": "venue", "judge_pool": "judging"}
OFFERS = {"venue_option", "unit_price"}  # vendor price lists are offers the planner chooses from, so quotes are OK


def empty():
    return {"seen": [], "messages": [], "facts": [], "plan": None, "trace": [], "decisions": []}


def load():
    return json.load(open(STATE, encoding="utf-8")) if os.path.exists(STATE) else empty()


def save(st):
    os.makedirs(".state", exist_ok=True)
    json.dump(st, open(STATE, "w", encoding="utf-8"), indent=1)


def h(s):
    return hashlib.sha256(s.strip().encode()).hexdigest()[:16]


def new_text(st, text):
    """Content-hash every non-empty line; return only lines never seen before (works for new files and appended files)."""
    seen = set(st["seen"])
    lines = [l for l in text.splitlines() if not l.strip() or h(l) not in seen]
    return "\n".join(lines).strip(), [h(l) for l in text.splitlines() if l.strip()]


def area_of(f):
    if isinstance(f.get("value"), dict) and "area" in f["value"] and f["kind"] not in OFFERS:
        return f["value"]["area"]
    if f["kind"] == "unit_price":
        return "judging" if f.get("scope") == "judge" else "food"
    return KIND_AREA.get(f["kind"], "core")


def allowed(role, f):
    a = area_of(f)
    if role == "judge" and f["kind"] == "judge_rule" and f["value"].get("op") == "forbid":
        return True  # a judge may state their own unavailability
    return a in ROLE_AREAS.get(role, set()) or (a == "funding" and role in ("organizer", "finance"))


def add_message(st, m, log):
    """Flatten a reader message into generic fact objects; mark ignored ones with the reason."""
    mid = len(st["messages"]) + 1
    msg = {"id": mid, "sender": m.get("sender", ""), "role": m["role"], "date": m.get("date") or "", "authority": m["authority"],
           "hash": h(json.dumps(m, sort_keys=True)), "status": "", "reason": "", "facts": []}
    for f in m["facts"]:
        v = f.get("value")
        if isinstance(v, dict) and "field" in v and "." in str(v["field"]):  # "judging.minutes_per_team" -> area/field
            v["area"], v["field"] = v["field"].split(".", 1)
        fact = {"msg_id": mid, "sender": msg["sender"], "sender_role": msg["role"], "date": msg["date"], "kind": f["kind"],
                "key": f["key"], "value": v, "unit": f.get("unit", ""), "scope": f.get("scope", ""), "authority": msg["authority"],
                "note": f.get("note", ""), "seq": len(st["facts"]), "status": "active"}
        if f["kind"] in ("request", "irrelevant"):
            fact["status"] = f"ignored: {f['kind']}"
        elif msg["authority"] == "quote_or_request" and f["kind"] not in OFFERS:
            fact["status"] = "ignored: unapproved request/quote"
        elif not allowed(msg["role"], f):
            fact["status"] = f"ignored: sender role '{msg['role']}' has no authority over {area_of(f)}"
        st["facts"].append(fact)
        msg["facts"].append(fact["seq"])
        if fact["status"] != "active":
            log.append(f"msg {mid} fact {f['key']}: {fact['status']}")
    st["messages"].append(msg)
    return msg


def resolve(st, log):
    """Same key: latest date wins (undated = newest arrival); older facts become 'superseded by msg N'."""
    best = {}
    before = {f["seq"]: f["status"] for f in st["facts"]}
    for f in st["facts"]:
        if f["status"] == "active" or f["status"].startswith("superseded"):
            f["status"] = "active"
            rank = (f["date"] or "99-99", f["seq"])
            if f["key"] not in best or rank > best[f["key"]][0]:
                best[f["key"]] = (rank, f)
    for f in st["facts"]:
        if f["status"] == "active" and best[f["key"]][1] is not f:
            f["status"] = f"superseded by msg {best[f['key']][1]['msg_id']}"
            if before[f["seq"]] != f["status"]:
                log.append(f"msg {f['msg_id']} {f['key']}={f['value']} {f['status']} (latest date wins)")
    return {f["key"]: f for f in st["facts"] if f["status"] == "active"}


def message_status(st):
    for m in st["messages"]:
        if m["status"] == "REJECTED":
            continue
        fs = [st["facts"][i] for i in m["facts"]]
        if any(f["status"] == "active" for f in fs):
            m["status"], m["reason"] = "ACCEPTED", ""
        elif any(f["status"].startswith("superseded") for f in fs):
            m["status"], m["reason"] = "SUPERSEDED", "; ".join(f"{f['key']} {f['status']}" for f in fs)
        else:
            m["status"] = "IGNORED"
            m["reason"] = "; ".join(sorted({f["status"].replace("ignored: ", "") for f in fs})) or "irrelevant: no planning facts"
