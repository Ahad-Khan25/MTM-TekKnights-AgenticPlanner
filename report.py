"""Output: stdout report, out/trace.txt, out/plan.json, out/report.html (self-contained with Animated Intro -> Command Centre Dashboard), and HTTP server for Render/Docker."""
import html, http.server, json, os, re, shutil, tempfile

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


def _state_payload(st, checks):
    return {"plan": st["plan"], "checks": checks, "messages": st["messages"],
            "facts": st["facts"], "trace": st["trace"], "decisions": st["decisions"]}


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
    json.dump(_state_payload(st, checks), open("out/plan.json", "w", encoding="utf-8"), indent=1)
    write_html(st, checks)
    print("\n".join(out))
    print(f"Report: {os.path.abspath('out/report.html')}\nTrace:  {os.path.abspath('out/trace.txt')}\nPlan:   {os.path.abspath('out/plan.json')}")


def _inline_page(folder, data_json=None):
    h = open(os.path.join(folder, "index.html"), encoding="utf-8").read()
    css = open(os.path.join(folder, "styles.css"), encoding="utf-8").read()
    js = open(os.path.join(folder, "app.js"), encoding="utf-8").read()
    h = re.sub(r'<link[^>]+href="styles\.css"[^>]*/?>', lambda _: f"<style>\n{css}\n</style>", h)
    boot = f"<script>window.__MTM_DATA__ = {data_json};</script>\n" if data_json else ""
    h = re.sub(r'<script[^>]+src="app\.js"[^>]*></script>', lambda _: f"{boot}<script>\n{js}\n</script>", h)
    return h


def write_html(st, checks):
    payload_json = json.dumps(_state_payload(st, checks))
    if os.path.exists("web/intro/index.html") and os.path.exists("web/dashboard/index.html"):
        intro_doc = _inline_page("web/intro")
        dash_doc = _inline_page("web/dashboard", payload_json)
        open("out/index.html", "w", encoding="utf-8").write(intro_doc)
        open("out/dashboard.html", "w", encoding="utf-8").write(dash_doc)
        # Build a single self-contained out/report.html that shows Animated Intro first, then switches to Command Centre Dashboard when "Plan your event now" is clicked
        b64_intro = json.dumps(intro_doc)
        b64_dash = json.dumps(dash_doc)
        combined = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mind to Machine · TekKnights Agentic Event Planner</title>
<style>html,body,iframe{{margin:0;padding:0;width:100%;height:100%;border:0;overflow:hidden;background:#0b1021}}</style>
</head><body><iframe id="stage" title="Mind to Machine"></iframe>
<script>
const INTRO_HTML = {b64_intro};
const DASH_HTML = {b64_dash};
const frame = document.getElementById('stage');
function showDashboard() {{
  frame.srcdoc = DASH_HTML;
  frame.onload = () => {{
    try {{ frame.contentWindow.__MTM_SHOW_INTRO__ = showIntro; }} catch (e) {{}}
  }};
}}
function showIntro() {{
  frame.srcdoc = INTRO_HTML;
  frame.onload = () => {{
    try {{ frame.contentWindow.__MTM_SHOW_DASHBOARD__ = showDashboard; }} catch (e) {{}}
  }};
}}
if (location.hash === '#dashboard') showDashboard(); else showIntro();
</script></body></html>"""
        open("out/report.html", "w", encoding="utf-8").write(combined)
        return
    # Fallback minimal HTML if web/ folder is missing
    open("out/report.html", "w", encoding="utf-8").write(f"<pre>{html.escape(payload_json)}</pre>")


def _ensure_built():
    if not os.path.exists("out/plan.json") and os.path.exists("data/sample_pack.txt"):
        import main
        main.main("data/sample_pack.txt")


class _Handler(http.server.BaseHTTPRequestHandler):
    def _send(self, code, body, ctype="text/html; charset=utf-8"):
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.end_headers()
        self.wfile.write(body.encode("utf-8") if isinstance(body, str) else body)

    def do_GET(self):
        p = self.path.split("?")[0]
        if p == "/api/health":
            return self._send(200, '{"status":"ok"}', "application/json")
        _ensure_built()
        if p in ("/api/plan", "/api/state") and os.path.exists("out/plan.json"):
            return self._send(200, open("out/plan.json", encoding="utf-8").read(), "application/json")
        if p == "/api/trace" and os.path.exists("out/trace.txt"):
            return self._send(200, open("out/trace.txt", encoding="utf-8").read(), "text/plain; charset=utf-8")
        if p in ("/dashboard", "/dashboard.html", "/home.html"):
            data_json = open("out/plan.json", encoding="utf-8").read() if os.path.exists("out/plan.json") else "{}"
            return self._send(200, _inline_page("web/dashboard", data_json))
        if p in ("/", "/index.html"):
            return self._send(200, _inline_page("web/intro"))
        if p == "/report.html" and os.path.exists("out/report.html"):
            return self._send(200, open("out/report.html", encoding="utf-8").read())
        return self._send(200, _inline_page("web/intro"))

    def do_POST(self):
        import main
        n = int(self.headers.get("Content-Length", 0))
        payload = json.loads(self.rfile.read(n) or b"{}")
        if self.path == "/api/reset":
            shutil.rmtree(".state", ignore_errors=True)
            shutil.rmtree("out", ignore_errors=True)
        txt = (payload.get("text") or "").strip()
        if txt:
            with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False, encoding="utf-8") as f:
                f.write(txt)
                tmp = f.name
            try:
                main.main(tmp)
            finally:
                os.remove(tmp)
        elif self.path == "/api/reset" and os.path.exists("data/sample_pack.txt"):
            main.main("data/sample_pack.txt")
        self._send(200, '{"ok":true}', "application/json")


if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    print(f"Serving Mind to Machine (Intro -> Dashboard) on http://0.0.0.0:{port}")
    http.server.HTTPServer(("0.0.0.0", port), _Handler).serve_forever()
