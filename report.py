"""Output: stdout report, out/trace.txt, out/plan.json, out/report.html (self-contained)."""
import html, json, os

BAR = "=" * 78


def rs(x):
    return f"Rs {x:,.0f}" if isinstance(x, (int, float)) else str(x)


def plan_lines(p):
    J, V, S, Fd, B, d = p["judging"], p["venue"], p["schedule"], p["food"], p["budget"], p["figures"]
    ch = V.get("chosen") or {}
    L = [f"Figures: {d['students']:.0f} students / team of {d['team_size']} -> {d['teams']} teams; judges needed {d['judges_needed']}; "
         f"judge-minutes {d['judge_minutes_total']}; people to feed {V['headcount']}",
         f"[VENUE]    {ch.get('name', 'NONE')} capacity {ch.get('capacity')} price {rs(ch.get('price'))} (needs {V['required_capacity']}"
         f"{', ' + ', '.join(V['required_features']) if V['required_features'] else ''})"]
    L += [f"           rejected {r['venue']}: {r['reason']}" for r in V["rejected"]]
    L.append(f"[SCHEDULE] {S.get('start')}-{S.get('end')} ({S.get('total_min')} min)" + (f" ERROR: {S['error']}" if S.get("error") else ""))
    L += [f"           {b['start']}-{b['end']}  {b['name']} ({b['min']} min)" for b in S.get("blocks", [])]
    L.append(f"[FOOD]     {Fd.get('boxes')} boxes x {Fd.get('tier')} @ {rs(Fd.get('unit_price'))} (price from msg {Fd.get('price_msg')}) = {rs(Fd.get('cost'))}")
    L += [f"           + {e['item']}: {e['qty']} x {rs(e['unit'])} = {rs(e['cost'])}" for e in Fd.get("extras", [])]
    L.append(f"[JUDGING]  {J['judges_used']} of {J['pool']:.0f} confirmed judges, max {J['max_teams_assigned']} teams each, "
             f"block {J['block_min']} min" + ("" if J["feasible"] else "  *** INFEASIBLE: judge pool too small ***"))
    L += [f"           {k}: teams {v}" for k, v in list(J["assignment"].items())]
    L.append(f"[BUDGET]   available {rs(B['available'])} (cap {rs(B['cap'])} + funding {rs(B['funding'])})")
    L += [f"           {l['item']:<40} {rs(l['amount']):>14}" for l in B["lines"]]
    L.append(f"           {'TOTAL':<40} {rs(B['total']):>14}   remaining {rs(B['remaining'])}")
    return L


def trace_lines(calls):
    L = []
    for c in calls:
        L += [f"--- MODEL CALL #{c['n']} | model: {c['model']} | area: {c['area']} | {c['seconds']}s",
              "INPUT:", c["input"], "OUTPUT:", c["text"],
              f"TOKENS (as reported by API): prompt={c['prompt_tokens']} completion={c['completion_tokens']} total={c['total_tokens']}"]
    return L


def tot(calls):
    return sum(c["total_tokens"] or 0 for c in calls)


def render(st, checks, start, log, secs):
    os.makedirs("out", exist_ok=True)
    p, run = st["plan"], st["trace"][start:]
    msg_rows = [f"  #{m['id']:<3} {m['status']:<10} {m['sender'][:28]:<28} {m['date']:<6} {m['reason']}" for m in st["messages"]]
    out = [BAR, "MESSAGES", BAR] + msg_rows + [BAR, "PLAN", BAR] + plan_lines(p) + [BAR, "VALIDATION (six checks)", BAR]
    out += [f"  [{'PASS' if c['ok'] else 'FAIL'}] {i + 1}. {c['name']}: {c['detail']}" for i, c in enumerate(checks)]
    out += [BAR, f"MODEL TRACE (this run: {len(run)} call(s))", BAR] + (trace_lines(run) or ["(no model calls this run)"])
    out += [BAR, "DECISION LOG (code, no model call)", BAR] + [f"  - {x}" for x in log]
    out += [BAR, f"TOTAL tokens this run: {tot(run)} | TOTAL tokens all runs: {tot(st['trace'])} | model calls this run: {len(run)} | {secs:.1f}s", BAR]
    full = [BAR, "FULL MODEL TRACE (all runs)", BAR] + trace_lines(st["trace"]) + [BAR, "DECISION LOG (code, no model call)", BAR]
    for r in st["decisions"]:
        full += [f"Run {r['run']} ({r['file']}):"] + [f"  - {x}" for x in r["entries"]]
    full += [BAR, f"TOTAL tokens: {tot(st['trace'])} over {len(st['trace'])} model call(s)", BAR]
    open("out/trace.txt", "w", encoding="utf-8").write("\n".join(full))
    json.dump({"plan": p, "checks": checks, "messages": st["messages"]}, open("out/plan.json", "w", encoding="utf-8"), indent=1)
    write_html(st, checks)
    print("\n".join(out))
    print(f"Report: {os.path.abspath('out/report.html')}\nTrace:  {os.path.abspath('out/trace.txt')}\nPlan:   {os.path.abspath('out/plan.json')}")


def write_html(st, checks):
    e = lambda s: html.escape(str(s))
    p = st["plan"]
    B = p["budget"]
    pct = min(100, B["total"] / B["available"] * 100) if B["available"] else 100
    secs = {"VENUE": [], "SCHEDULE": [], "FOOD": [], "JUDGING": [], "BUDGET": []}
    cur = None
    for line in plan_lines(p)[1:]:
        tag = line[1:line.index("]")] if line.startswith("[") else None
        cur = tag or cur
        secs[cur].append(line.split("]", 1)[1].strip() if tag else line.strip())
    cards = "".join(f"<div class=card><h3>{k.title()}</h3>" + "".join(f"<div>{e(x)}</div>" for x in v) + "</div>" for k, v in secs.items())
    chk = "".join(f"<li><span class='b {'ok' if c['ok'] else 'bad'}'>{'PASS' if c['ok'] else 'FAIL'}</span> <b>{e(c['name'])}</b> - {e(c['detail'])}</li>" for c in checks)
    run, tr = 0, ""
    for c in st["trace"]:
        run += c["total_tokens"] or 0
        tr += (f"<details><summary>#{c['n']} &middot; {e(c['model'])} &middot; <b>{c['area']}</b> &middot; prompt {c['prompt_tokens']} / completion "
               f"{c['completion_tokens']} / total {c['total_tokens']} &middot; running total {run}</summary><h4>Input</h4><pre>{e(c['input'])}</pre>"
               f"<h4>Output</h4><pre>{e(c['text'])}</pre></details>")
    dl = "".join(f"<h4>Run {r['run']} ({e(r['file'])})</h4><ul>" + "".join(f"<li>{e(x)}</li>" for x in r["entries"]) + "</ul>" for r in st["decisions"])
    ms = "".join(f"<tr class={m['status']}><td>{m['id']}</td><td>{m['status']}</td><td>{e(m['sender'])}</td><td>{e(m['date'])}</td><td>{e(m['reason'])}</td></tr>" for m in st["messages"])
    page = f"""<!doctype html><html><head><meta charset=utf-8><title>Mind to Machine - Plan</title><style>
body{{font-family:Segoe UI,Arial,sans-serif;background:#0f172a;color:#f1f5f9;margin:0;padding:20px}}h1{{margin:0 0 10px}}
.tabs button{{background:#1e293b;color:#f1f5f9;border:1px solid #475569;padding:10px 18px;font-size:15px;cursor:pointer;border-radius:6px 6px 0 0}}
.tabs button.on{{background:#f1f5f9;color:#0f172a;font-weight:bold}}.tab{{display:none;background:#1e293b;padding:16px;border-radius:0 8px 8px 8px}}.tab.on{{display:block}}
.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:12px}}.card{{background:#0f172a;border:1px solid #475569;border-radius:8px;padding:12px;font-size:14px;line-height:1.5}}
h3{{margin:0 0 6px;color:#38bdf8}}.b{{padding:2px 8px;border-radius:4px;font-weight:bold}}.ok{{background:#16a34a}}.bad{{background:#dc2626}}
li{{margin:6px 0}}.bar{{background:#334155;border-radius:6px;height:22px;overflow:hidden}}.fill{{height:100%;background:{'#16a34a' if B['total'] <= B['available'] else '#dc2626'}}}
pre{{white-space:pre-wrap;background:#020617;padding:10px;border-radius:6px;font-size:12px}}details{{border:1px solid #475569;border-radius:6px;margin:6px 0;padding:8px}}
table{{border-collapse:collapse;width:100%}}td,th{{border:1px solid #475569;padding:6px;text-align:left;font-size:14px}}
tr.REJECTED td{{background:#7f1d1d;color:#fff;font-weight:bold}}tr.ACCEPTED td:nth-child(2){{color:#4ade80}}tr.IGNORED td:nth-child(2),tr.SUPERSEDED td:nth-child(2){{color:#fbbf24}}
</style></head><body><h1>Mind to Machine &mdash; Hackathon Plan</h1>
<div class=tabs><button class=on onclick="t(0)">Plan</button><button onclick="t(1)">Trace</button><button onclick="t(2)">Messages</button></div>
<div class="tab on"><h3>Budget: Rs {B['total']:,.0f} of Rs {B['available']:,.0f} (remaining Rs {B['remaining']:,.0f})</h3><div class=bar><div class=fill style="width:{pct:.1f}%"></div></div><br>
<div class=grid>{cards}</div><h3>Six checks</h3><ul>{chk}</ul></div>
<div class=tab><p>{len(st['trace'])} model call(s), TOTAL tokens <b>{run}</b>. Token counts copied from the provider API response.</p>{tr}<h3>Decision log (code, no model call)</h3>{dl}</div>
<div class=tab><table><tr><th>#</th><th>Status</th><th>Sender</th><th>Date</th><th>Reason</th></tr>{ms}</table></div>
<script>function t(i){{document.querySelectorAll('.tab').forEach((x,j)=>x.classList.toggle('on',i==j));document.querySelectorAll('.tabs button').forEach((x,j)=>x.classList.toggle('on',i==j))}}</script>
</body></html>"""
    open("out/report.html", "w", encoding="utf-8").write(page)
