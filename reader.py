"""Reader: the ONLY component that calls a model (area tag "reading"). Extracts + normalizes facts; no arithmetic, no planning."""
import json, re
import llm

KINDS = {"approved_total_budget", "headcount", "team_size", "staff_count", "venue_option", "unit_price", "prepaid_cost",
         "cost", "funding", "judge_pool", "judge_rule", "schedule_rule", "hard_rule", "order_change", "request", "irrelevant"}
ROLES = {"organizer", "finance", "venue", "caterer", "judging", "sponsor", "student", "judge", "other"}
AUTH = {"approved", "quote_or_request", "info"}
OPS = {"min", "max", "require", "forbid", "equals"}
RULE_KINDS = {"judge_rule", "schedule_rule", "hard_rule", "order_change"}

SYSTEM = """Extract planning facts for a hackathon from messages. JSON only. Do NOT calculate or plan; copy numbers as stated (Rs 1,200 -> 1200). Translate Roman Urdu faithfully. Split the text into separate messages.
Output: {"messages":[{"id":int,"sender":str,"role":ROLE,"date":"MM-DD" or "","authority":AUTH,"facts":[{"kind":KIND,"key":snake_case,"value":any,"unit":str,"scope":str,"note":str}]}]}
ROLE: organizer(dean/admin/principal)|finance|venue|caterer|judging(coordinator)|sponsor|student|judge|other
AUTH: approved(decision, instruction, confirmed fact or price)|quote_or_request(asks/proposes, "can we", quote for something not ordered)|info
KIND:
headcount: key=group (students, volunteers, guests, vegetarian..), value=n, scope "attendee" or "subset"(part of another group)
team_size: key team_size | staff_count: key staff | approved_total_budget: key budget_cap | funding: extra money given, key=source
venue_option: key=venue name, value={"capacity":n,"price":n,"features":[..],"open":"HH:MM","close":"HH:MM"} (omit unknown)
unit_price: key=item_tier e.g. lunch_standard, value=price, scope "meal"(main meal tier) | "judge"(fee per judge) | group name(add-on per head of that group)
prepaid_cost: already paid/ordered, key=item | cost: approved new cost, key=item
judge_pool: key judges_confirmed, value=n
judge_rule|schedule_rule|hard_rule|order_change: value={"area":venue|schedule|food|judging|budget,"field":str,"op":min|max|require|forbid|equals,"value":any}
 fields: judging.minutes_per_team, judging.max_teams_per_judge, judging.forbid_window("HH:MM-HH:MM"), schedule.total_min, schedule.prayer_min, schedule.lunch_min, schedule.start_time, schedule.end_time, venue.features, venue.capacity_buffer_pct, food.boxes, budget.reserve_pct, budget.tax_pct; else invent area.field
request: asks for something not approved | irrelevant: no planning impact (facts may be [])
"""


def _validate(d):
    msgs = d.get("messages")
    if not isinstance(msgs, list):
        raise ValueError("'messages' must be a list")
    for m in msgs:
        for k in ("id", "role", "authority", "facts"):
            if k not in m:
                raise ValueError(f"message missing '{k}'")
        m["role"] = m["role"] if m["role"] in ROLES else "other"
        m["authority"] = m["authority"] if m["authority"] in AUTH else "info"
        for f in m["facts"]:
            if f.get("kind") not in KINDS:
                raise ValueError(f"bad kind {f.get('kind')!r}")
            if not f.get("key"):
                raise ValueError("fact missing key")
            if f["kind"] in RULE_KINDS:
                v = f.get("value")
                if not (isinstance(v, dict) and {"area", "field", "op"} <= set(v) and v["op"] in OPS):
                    raise ValueError(f"rule {f['key']} needs value {{area,field,op,value}}")
    return msgs


def read(text, existing_keys, trace):
    """One call (+ one retry on invalid JSON/schema). Every call is appended to trace with the provider's token counts."""
    user = (f"Existing keys (reuse if same meaning): {', '.join(sorted(existing_keys))}\n" if existing_keys else "") + "MESSAGES:\n" + text
    for attempt in range(2):
        r = llm.chat(SYSTEM, user)
        trace.append({"n": len(trace) + 1, "area": "reading", "input": SYSTEM + "\n---\n" + user, **r})
        try:
            raw = re.search(r"\{.*\}", r["text"], re.S).group(0)
            return _validate(json.loads(raw))
        except Exception as e:  # retry once, telling the model what was wrong
            user += f"\n\nYour previous output was invalid ({e}). Return valid JSON matching the schema."
    raise RuntimeError("Reader returned invalid JSON twice")
