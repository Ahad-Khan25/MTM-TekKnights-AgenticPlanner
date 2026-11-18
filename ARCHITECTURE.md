# Architecture

```
messages file ──► store.new_text (hash lines, keep unseen) ──► reader (1 model call, "reading")
      ──► store (flatten → authority check → latest-date-wins) ──► planner (pure code, dependency graph)
      ──► validator (six checks + message rules) ──► commit or REJECT ──► report (stdout, trace, plan.json, report.html)
```

| Component | What it is for | What breaks without it |
|---|---|---|
| `main.py` | Orchestration only: one command for first pack and every update; update = apply on a copy, commit only if no check newly fails. | No single entry point; a bad message could corrupt the plan with no rollback. |
| `llm.py` | Thin provider interface (Groq/OpenAI-compatible, Anthropic, Ollama) chosen by env vars; copies token counts from the API response (`usage` / `prompt_eval_count`+`eval_count`). | Provider lock-in; token counts would have to be guessed (disqualifying). |
| `reader.py` | The **only** model use. Splits raw text into messages (no format assumed), translates Roman Urdu, emits generic fact objects (`kind,key,value,unit,scope,authority`) and structured rules `{area,field,op,value}`. Temperature 0, JSON only, schema-checked, 1 retry. Gets the list of existing keys so updates collide with the facts they change. | Nothing could read free-form, mixed-language text. Without structured rules, unseen constraint kinds could not be enforced by code. Without key reuse, "printing 15,000" would not replace "printing 10,000". |
| `store.py` | Fact store + state. Hash-based "seen" lines (`.state/state.json`), sender-role authority (caterer may change food prices, not budget/headcount), requests/irrelevant are ignored, same key → latest date wins and older is "superseded by msg N". | Old prices, DJ requests, or unauthorised senders would enter the plan; re-running would re-read and double-count messages. |
| `planner.py` | Pure functions per area: `judging` (min judges from pool, round-robin assignment ≤ max/judge), `venue` (cheapest compliant: capacity+buffer, required features, opening hours), `schedule` (exact length; opening, build, lunch, prayer, judging, closing; avoids forbidden windows, fits venue hours), `food` (boxes ≥ people and min order, latest price, add-ons, downgrade tier if over budget), `budget` (all lines, tax/reserve, funding, remaining). `DEPS` graph → only affected areas recompute. | The model would have to do arithmetic (wrong and token-expensive); every update would recompute (and could not be predicted). |
| `validator.py` | Six independent checks: figures, budget, venue, schedule, judges, all areas; plus every structured rule from messages mapped to plan fields. | Wrong messages (e.g. "100 boxes" for 177 people) would silently pass; infeasible plans would not be flagged. |
| `report.py` | Stdout report, numbered trace (model, area tag, full input/output, API tokens, TOTAL), decision log (code, no model call), `out/report.html` with Plan/Trace/Messages tabs. | Judges could not verify tokens, rejections or the plan. |

## Key decisions
- **One model call per run** (batch for the first pack, one per update): language needs a model, arithmetic does not. Tag is always `reading`, so for any update the prediction is: *areas that make model calls = [reading]*.
- **Reject rule**: a new message is rejected if applying it makes any of the six checks go from PASS to FAIL; the previous plan is restored and the failing numbers are printed.
- **Defaults** that no message states (opening/closing 15 min, lunch 45 min, start 10:00) are generic design choices, overridden by any schedule rule in the messages; they are not pack facts.
- **Small model**: `llama-3.1-8b-instant` (8B) via Groq for speed; Ollama supported for fully local runs.
