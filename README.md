# Mind to Machine – Agentic Hackathon Planner (TekKnights)

Reads a pack of messages (English / Roman Urdu, any format) and produces a valid plan for a 4-hour physical hackathon:
venue, schedule, food, judging, budget. **One model call reads the language; everything else is plain code.**

## Run (CLI — judging command)
```
python main.py <path-to-messages-file>
```
- First run (empty `.state/`): the whole pack is read in **1 model call**, then the plan is built and validated.
- Later runs with the **same command** on a file holding new message(s) (or the old file with messages appended):
  only unseen lines (content hash) are read, **1 model call**, and only affected areas are recomputed.
- Start from scratch: delete `.state/` (`Remove-Item -Recurse .state`).

Outputs: stdout (messages, plan, six checks, numbered model trace, decision log, TOTAL tokens),
`out/plan.json`, `out/trace.txt`, `out/report.html` (open in any browser; tabs Plan / Trace / Messages).

## Environment (`.env` in repo root, gitignored — see `.env.example`)
| var | default | meaning |
|---|---|---|
| `LLM_PROVIDER` | `openai` | `openai` (any OpenAI-compatible API: Groq, OpenRouter…), `anthropic`, or `ollama` (local) |
| `LLM_MODEL` | `openai/gpt-oss-20b` | small open-weight 20B model on Groq |
| `LLM_REASONING_EFFORT` | `low` | optional (`low` keeps token usage minimal on reasoning models) |
| `LLM_BASE_URL` | Groq / Anthropic / `http://localhost:11434` | override endpoint |
| `LLM_API_KEY` | – | key (falls back to `GROQ_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`) |

## Docker & Render Deployment
Includes `Dockerfile`, `render.yaml`, `docker-compose.yml`, and `.dockerignore` (same layout as CityLab):
- Local web server: `python report.py` (or `docker compose up --build`) → serves `out/report.html` on `http://localhost:8000` with `/api/health`, `/api/plan`, `/api/trace`, and live message submission.
- Render: connect the GitHub repo as a Blueprint or Docker Web Service; set `LLM_API_KEY` (or `GROQ_API_KEY`) in Render Environment.

## Tests
```
python main.py data/sample_pack.txt               # 50 teams, 17 judges, 177 fed, Hall A, Rs 547,400 / 650,000
python main.py tests/fixtures/practice_change.txt # printing 15,000 -> Rs 552,400, only [budget] recomputed, 1 call
python main.py tests/fixtures/practice_wrong.txt  # REJECTED: boxes 100 < 177 people, plan unchanged
```
Generalisation packs (clear `.state/` first): `tests/fixtures/pack_a.txt`, `tests/fixtures/pack_b.txt`.
See [ARCHITECTURE.md](ARCHITECTURE.md) for what each part does and why.
