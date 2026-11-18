"""Reader: the ONLY component that calls a model (area tag "reading"). Extracts + normalizes facts; no arithmetic, no planning."""
import json, re
import llm

KINDS = {"approved_total_budget", "headcount", "team_size", "staff_count", "venue_option", "unit_price", "prepaid_cost",
         "cost", "funding", "judge_pool", "judge_rule", "schedule_rule", "hard_rule", "order_change", "request", "irrelevant"}
ROLES = {"organizer", "finance", "venue", "caterer", "judging", "sponsor", "student", "judge", "other"}
AUTH = {"approved", "quote_or_request", "info"}
OPS = {"min", "max", "require", "forbid", "equals"}
RULE_KINDS = {"judge_rule", "schedule_rule", "hard_rule", "order_change"}

SYSTEM = """Extract hackathon planning facts from messages. Output compact, single-line valid JSON only (no markdown fences, no newlines, every array element in {...}). Do NOT calculate or plan; copy numbers as stated (Rs 1,200 -> 1200). Translate Roman Urdu faithfully. Split raw text into separate messages.
Schema:
{"messages":[{"id":1,"sender":"str","role":"ROLE","date":"MM-DD","authority":"AUTH","facts":[{"kind":"KIND","key":"snake_case","value":any,"unit":"str","scope":"str","note":"str"}]}]}
ROLE: organizer(dean/admin/principal/vc)|finance|venue|caterer|judging(coordinator/lead)|sponsor|student|judge|other
AUTH:
- "approved": ANY confirmed fact, official rule/instruction (including "lazmi"/mandatory/policy requirements from admin/organizer), bill/invoice/prepaid item from Finance, confirmed judge count/rules, or confirmed sponsor contribution.
- "quote_or_request": ONLY when someone asks permission ("can we...", "kya hum...", "barha dein"/asking to increase budget) or gives an unaccepted proposal.
- "info": vendor price/venue lists, caterer actions, status updates.
DATE: MUST be MONTH-DAY "MM-DD" (e.g. "2 Dec" -> "12-02", "9 Nov" -> "11-09", "25 Nov" -> "11-25", "15 Jan" -> "01-15"). NEVER output DD-MM! If no date is in the message, MUST be "".
KIND & value rules (ALWAYS put value under "value", NEVER use "cost" or top-level "field"):
- headcount: key=distinct group name ("students", "volunteers", "faculty", "vegetarian"), value=number, scope="attendee" or "subset"(if part of students e.g. vegetarian)
- team_size: key="team_size", value=number
- staff_count: key="staff" (or "faculty_staff", "volunteers" — use distinct keys if two groups in same message!), value=number
- approved_total_budget: key="budget_cap", value=number
- funding: extra sponsor/grant money, key=source_name, value=number
- venue_option: key=snake_case hall name, value={"capacity":n,"price":n,"features":["generator","wheelchair"],"open":"HH:MM","close":"HH:MM"} (ONLY include features explicitly stated for THAT specific hall! Normalize features to single keywords: "generator", "wheelchair", "stairs"; omit open/close if not stated!)
- unit_price: key=item_tier (lunch_standard, lunch_basic, lunch_premium, vegetarian_extra, judge_honorarium), value=number, scope="meal"(main box tier) | "judge"(per judge fee) | group_name(extra per person in group e.g. "vegetarian")
- prepaid_cost: already ordered/paid/billed item from finance, key=item_name (prizes, backup_internet, printing, trophies, banners), value=number
- cost: approved new expense, key=item_name, value=number
- judge_pool: key="judges_confirmed", value=number
- judge_rule | schedule_rule | hard_rule | order_change: key=short_name, value={"area":"venue|schedule|food|judging|budget","field":"FIELD","op":"min|max|require|forbid|equals","value":val}
  Standard area+field names (MUST extract BOTH event duration AND prayer/namaz break if mentioned!):
  schedule.total_min (val=hours e.g. 4 or minutes e.g. 240, op="equals"), schedule.prayer_min (val=minutes e.g. 15 or 20, op="min"), schedule.lunch_min, schedule.start_time, schedule.end_time
  judging.minutes_per_team (op="equals"), judging.max_teams_per_judge (op="max"), judging.forbid_window (val="HH:MM-HH:MM", op="forbid")
  venue.features (val="generator" or "wheelchair", op="require" or "forbid" — use hard_rule when admin/organizer says venue must have generator or wheelchair!), venue.capacity_buffer_pct (val=percent number, op="min")
  food.boxes (op="min" for minimum catering order, or kind="order_change" op="equals" if someone changes/rounds box count)
  budget.reserve_pct (val=percent, op="min"), budget.tax_pct (val=percent, op="equals")
- request: unapproved ask (e.g. DJ, student cap increase, caterer asking to raise budget), value=number or str
- irrelevant: no planning impact (late arrival, traffic, parking), value=str"""


MONTHS = {"jan": "01", "feb": "02", "mar": "03", "apr": "04", "may": "05", "jun": "06",
          "jul": "07", "aug": "08", "sep": "09", "oct": "10", "nov": "11", "dec": "12"}


def _coerce_json(raw):
    # Repair rare model typos: `},"id":` or `},"{"id":` -> `},{"id":`, `},"kind":` -> `},{"kind":`, and extra/missing `}` before `]` or `,`
    s = re.sub(r'\}\s*,\s*"?\{?\s*"id"\s*:', '},{"id":', raw)
    s = re.sub(r'\}\s*,\s*"?\{?\s*"kind"\s*:', '},{"kind":', s)
    s = re.sub(r'"note"\s*:\s*"[^"]*"\s*\}\s*\}\s*,\s*\{\s*"kind"', lambda m: m.group(0).replace("}},", "},", 1), s)
    s = re.sub(r'"note"\s*:\s*"[^"]*"\s*\}\s*\}\s*\]', lambda m: m.group(0).replace("}}]", "}]", 1), s)
    return s


def _fix_date(dt, raw_text):
    dt = str(dt or "").strip()
    if not re.fullmatch(r"\d{2}-\d{2}", dt) or dt == "01-01":
        return ""
    a, b = dt.split("-")
    # Check if raw text has e.g. "2 Dec" and model wrote "02-12" (DD-MM instead of MM-DD)
    inv_m = [k for k, v in MONTHS.items() if v == b]
    if inv_m and re.search(rf"\b0?{int(a)}\s+{inv_m[0]}", raw_text, re.I):
        return f"{b}-{a}"
    return dt


def _validate(d, raw_text=""):
    msgs = d.get("messages")
    if not isinstance(msgs, list):
        raise ValueError("'messages' must be a list")
    for m in msgs:
        for k in ("id", "role", "authority", "facts"):
            if k not in m:
                raise ValueError(f"message missing '{k}'")
        m["role"] = m["role"] if m["role"] in ROLES else "other"
        if "admin" in m.get("sender", "").lower() and m["role"] == "venue":
            m["role"] = "organizer"
        m["authority"] = m["authority"] if m["authority"] in AUTH else ("quote_or_request" if m["authority"] == "request" else "info")
        m["date"] = _fix_date(m.get("date"), raw_text)
        seen_keys = set()
        for f in m["facts"]:
            knd = f.get("kind", "")
            key = str(f.get("key") or "")
            if knd == "info":
                f["kind"] = knd = "irrelevant"
            elif knd == "schedule":
                f["kind"] = knd = "schedule_rule"
            elif knd in ("budget", "venue", "food", "judging"):
                f["kind"] = knd = "judge_rule" if knd == "judging" else "hard_rule"
            elif knd == "venue_option" and not isinstance(f.get("value"), dict):
                f["kind"] = knd = "hard_rule"
            elif knd == "request" and m["role"] == "organizer" and ("generator" in key or "wheelchair" in key):
                f["kind"] = knd = "hard_rule"
                m["authority"] = "approved"
                f["value"] = {"area": "venue", "field": "features", "op": "require",
                              "value": "generator" if "generator" in key else "wheelchair"}
            if knd == "venue_option" and isinstance(f.get("value"), dict):
                v = f["value"]
                if v.get("open") in ("00:00", "00:0") and v.get("close") == "23:59":
                    v.pop("open", None)
                    v.pop("close", None)
            if f.get("kind") not in KINDS:
                raise ValueError(f"bad kind {f.get('kind')!r}")
            if "value" not in f and "cost" in f:
                f["value"] = f.pop("cost")
            if f["kind"] in RULE_KINDS:
                v = f.get("value")
                if not isinstance(v, dict):
                    fld = str(f.pop("field", "") or f.get("key") or f["kind"])
                    area = fld.split(".")[0] if "." in fld else (
                        "judging" if f["kind"] == "judge_rule" or "judge" in fld or "team" in fld
                        else "schedule" if f["kind"] == "schedule_rule" or "prayer" in fld or "total_min" in fld
                        else "food" if f["kind"] == "order_change" or "box" in fld
                        else "budget" if "reserve" in fld or "tax" in fld
                        else "venue"
                    )
                    field = fld.split(".")[-1]
                    if "box" in field: field = "boxes"
                    elif "prayer" in field: field = "prayer_min"
                    elif "minutes_per_team" in field or field == "mpt": field = "minutes_per_team"
                    elif "max_teams" in field or field == "mtj": field = "max_teams_per_judge"
                    elif "buffer" in field: field = "capacity_buffer_pct"
                    op = f.pop("op", None) or ("equals" if f["kind"] == "order_change" or field in ("minutes_per_team", "total_min", "tax_pct")
                                               else "max" if field == "max_teams_per_judge" else "min")
                    f["value"] = v = {"area": area, "field": field, "op": op, "value": v}
                if "value" not in v:
                    v["value"] = v.get("val") or f.get("note") or ("wheelchair" if "wheelchair" in key else "generator" if "generator" in key else True)
                if not (isinstance(v, dict) and {"area", "field", "op", "value"} <= set(v) and v["op"] in OPS):
                    raise ValueError(f"rule {f.get('key')} needs value {{area,field,op,value}}")
            if not f.get("key"):
                f["key"] = (f["value"].get("field") if isinstance(f.get("value"), dict) else None) or f["kind"]
            if f["key"] in seen_keys and f.get("scope"):
                f["key"] = f"{f['key']}_{f['scope']}"
            seen_keys.add(f["key"])
    return msgs


def read(text, existing_keys, trace):
    """One call (+ one retry on invalid JSON/schema). Every call is appended to trace with the provider's token counts."""
    user = (f"Existing keys (reuse exact key if updating same item): {', '.join(sorted(existing_keys))}\n" if existing_keys else "") + "MESSAGES:\n" + text
    for attempt in range(2):
        r = llm.chat(SYSTEM, user)
        trace.append({"n": len(trace) + 1, "area": "reading", "input": SYSTEM + "\n---\n" + user, **r})
        try:
            raw = _coerce_json(re.search(r"\{.*\}", r["text"], re.S).group(0))
            return _validate(json.loads(raw), text)
        except Exception as e:
            user += f"\n\nYour previous output failed validation ({e}). Return strictly valid JSON matching the schema."
    raise RuntimeError("Reader returned invalid JSON twice")
