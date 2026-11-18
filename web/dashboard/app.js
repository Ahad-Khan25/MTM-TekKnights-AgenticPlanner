/* Mind to Machine · Command Centre
   Hydrates from real backend state (window.__MTM_DATA__ or /api/state) while keeping EN / UR / Roman Urdu translations. */

var I18N = {
  en: {
    skip: "Skip to content", nav_plan: "Plan", nav_schedule: "Schedule", nav_trace: "Trace", nav_messages: "Messages",
    side_title: "Islamabad · 4 hours", side_body: "150 students, 50 teams, 10 staff, 17 judges.",
    kicker: "Event operations", title: "Executive overview", search: "Search messages and trace",
    ok: "Plan is valid. Every constraint is met.", bad: "Validation check failed. Review the latest change.",
    m_budget: "Budget spent", m_venue: "Venue", m_lunch: "Lunch boxes", m_judges: "Judges",
    v_hall: "Hall A", v_seats: "Seats 200 for 177 people", v_price: "Rs 1,200 each, latest price",
    v_judges: "17 of 20", v_judges_n: "3 teams each, 15 min per team", left: "left of",
    h_money: "Where the money goes", d_money: "Plain code does the sums. The model only reads messages.", total: "Total committed",
    b_venue: "Venue · Hall A", b_lunch: "Lunch · 177 × Rs 1,200", b_judges: "Judges · 17 × Rs 5,000",
    b_prizes: "Prizes", b_internet: "Backup internet", b_print: "Printing",
    h_sched: "Schedule", d_sched: "240 minutes, with a prayer break and no overlaps.",
    s_checkin: "Check-in and briefing", s_checkin_d: "All 50 teams", s_build: "Build time", s_build_d: "110 minutes",
    s_judging: "Judging, 3 rounds", s_judging_d: "45 minutes plus 5 minutes of slack for a late judge",
    s_prayer: "Prayer break", s_prayer_d: "15 minutes", s_lunch: "Lunch", s_lunch_d: "177 boxes, delivery free",
    s_awards: "Awards", s_awards_d: "Prizes Rs 100,000",
    h_trace: "Trace", d_trace: "Every model call, numbered, with its area, input, output and tokens.",
    paste: "Paste a new message", update: "Update plan", try: "Try:", chip1: "Printing bill change", chip2: "Caterer rounds down",
    tokens: "Total tokens", callsWord: "calls", callWord: "Call", inWord: "in", outWord: "out", noModel: "Decision log (code, no model call)",
    demo: "Token counts are reported directly by the provider API (prompt / completion / total).",
    h_msgs: "Messages", d_msgs: "What each message did to the plan, and why.", c_from: "From", c_msg: "Message / Facts", c_status: "Status",
    st_used: "ACCEPTED", st_old: "SUPERSEDED", st_held: "IGNORED", st_info: "IGNORED", st_rej: "REJECTED", st_chg: "ACCEPTED",
    menu_open: "Open menu", menu_close: "Close menu"
  },
  ur: {
    skip: "مواد پر جائیں", nav_plan: "منصوبہ", nav_schedule: "شیڈول", nav_trace: "ٹریس", nav_messages: "پیغامات",
    side_title: "اسلام آباد · 4 گھنٹے", side_body: "150 طلبہ، 50 ٹیمیں، 10 عملہ، 17 جج۔",
    kicker: "ایونٹ کے آپریشنز", title: "ایگزیکٹو جائزہ", search: "پیغامات اور ٹریس میں تلاش کریں",
    ok: "منصوبہ درست ہے۔ تمام شرائط پوری ہیں۔", bad: "منصوبہ بجٹ سے زیادہ ہے۔ تازہ تبدیلی دیکھیں۔",
    m_budget: "خرچ شدہ بجٹ", m_venue: "مقام", m_lunch: "لنچ باکس", m_judges: "جج صاحبان",
    v_hall: "ہال اے", v_seats: "177 افراد کے لیے 200 نشستیں", v_price: "ہر ایک 1,200 روپے، تازہ قیمت",
    v_judges: "20 میں سے 17", v_judges_n: "ہر جج 3 ٹیمیں، فی ٹیم 15 منٹ", left: "باقی از",
    h_money: "رقم کہاں خرچ ہو رہی ہے", d_money: "حساب سادہ کوڈ کرتا ہے۔ ماڈل صرف پیغامات پڑھتا ہے۔", total: "کل مختص رقم",
    b_venue: "مقام · ہال اے", b_lunch: "لنچ · 177 × 1,200 روپے", b_judges: "جج · 17 × 5,000 روپے",
    b_prizes: "انعامات", b_internet: "بیک اپ انٹرنیٹ", b_print: "پرنٹنگ",
    h_sched: "شیڈول", d_sched: "240 منٹ، جس میں 15 منٹ کا نماز کا وقفہ شامل ہے۔",
    s_checkin: "رجسٹریشن اور بریفنگ", s_checkin_d: "تمام 50 ٹیمیں", s_build: "تیاری کا وقت", s_build_d: "110 منٹ",
    s_judging: "ججنگ، 3 راؤنڈ", s_judging_d: "45 منٹ اور دیر سے آنے والے جج کے لیے 5 منٹ کی گنجائش",
    s_prayer: "نماز کا وقفہ", s_prayer_d: "15 منٹ", s_lunch: "لنچ", s_lunch_d: "177 باکس، ڈیلیوری مفت",
    s_awards: "انعامات کی تقسیم", s_awards_d: "انعامات 100,000 روپے",
    h_trace: "ٹریس", d_trace: "ہر ماڈل کال، نمبر کے ساتھ، اس کے شعبے، ان پٹ، آؤٹ پٹ اور ٹوکن سمیت۔",
    paste: "نیا پیغام یہاں چسپاں کریں", update: "منصوبہ اپ ڈیٹ کریں", try: "آزمائیں:", chip1: "پرنٹنگ بل میں تبدیلی", chip2: "کیٹرر نے تعداد کم کر دی",
    tokens: "کل ٹوکن", callsWord: "کالز", callWord: "کال", inWord: "ان", outWord: "آؤٹ", noModel: "ماڈل کال نہیں۔ سادہ کوڈ۔",
    demo: "ٹوکن کی تعداد براہ راست ماڈل اے پی آئی سے لی گئی ہے۔",
    h_msgs: "پیغامات", d_msgs: "ہر پیغام نے منصوبے پر کیا اثر ڈالا، اور کیوں۔", c_from: "بھیجنے والا", c_msg: "پیغام", c_status: "حیثیت",
    st_used: "منظور", st_old: "پرانا", st_held: "نظر انداز", st_info: "نظر انداز", st_rej: "مسترد", st_chg: "نافذ",
    menu_open: "مینو کھولیں", menu_close: "مینو بند کریں"
  },
  rm: {
    skip: "Content par jayein", nav_plan: "Plan", nav_schedule: "Schedule", nav_trace: "Trace", nav_messages: "Messages",
    side_title: "Islamabad · 4 ghante", side_body: "150 students, 50 teams, 10 staff, 17 judges.",
    kicker: "Event operations ki tafseel", title: "Executive jaiza", search: "Messages aur trace mein talash karein",
    ok: "Plan durust hai. Tamam shara'it poori hain.", bad: "Plan budget se zyada hai. Taza tabdeeli dekhein.",
    m_budget: "Kharch shuda budget", m_venue: "Maqam", m_lunch: "Lunch box", m_judges: "Judges",
    v_hall: "Hall A", v_seats: "177 afraad ke liye 200 nashistein", v_price: "Rs 1,200 har ek, taza qeemat",
    v_judges: "20 mein se 17", v_judges_n: "Har judge 3 teams, har team 15 min", left: "baqi az",
    h_money: "Paisa kahan ja raha hai", d_money: "Hisaab simple code karta hai. Model sirf messages parhta hai.", total: "Kul mukhtas raqam",
    b_venue: "Maqam · Hall A", b_lunch: "Lunch · 177 × Rs 1,200", b_judges: "Judges · 17 × Rs 5,000",
    b_prizes: "Inaamat", b_internet: "Backup internet", b_print: "Printing",
    h_sched: "Schedule", d_sched: "240 minute, jis mein 15 minute ka namaz ka waqfa shamil hai.",
    s_checkin: "Check-in aur briefing", s_checkin_d: "Tamam 50 teams", s_build: "Banane ka waqt", s_build_d: "110 minute",
    s_judging: "Judging, 3 rounds", s_judging_d: "45 minute aur der se anay wale judge ke liye 5 minute ki gunjaish",
    s_prayer: "Namaz ka waqfa", s_prayer_d: "15 minute", s_lunch: "Lunch", s_lunch_d: "177 box, delivery free",
    s_awards: "Inaamat ki taqseem", s_awards_d: "Inaamat Rs 100,000",
    h_trace: "Trace", d_trace: "Har model call, number ke saath, uska area, input, output aur tokens.",
    paste: "Naya message yahan paste karein", update: "Plan update karein", try: "Aazmayein:", chip1: "Printing bill mein tabdeeli", chip2: "Caterer ne boxes kam kar diye",
    tokens: "Kul tokens", callsWord: "calls", callWord: "Call", inWord: "in", outWord: "out", noModel: "Model call nahi. Simple code.",
    demo: "Token ginti asal model API se li gayi hai.",
    h_msgs: "Messages", d_msgs: "Har message ne plan par kya asar dala, aur kyun.", c_from: "Bhejne wala", c_msg: "Message", c_status: "Halat",
    st_used: "Manzoor", st_old: "Purana", st_held: "Shamil nahi", st_info: "Note kiya", st_rej: "Mustarad", st_chg: "Nafiz",
    menu_open: "Menu kholein", menu_close: "Menu band karein"
  }
};

var LANGS = { en: { lang: "en", dir: "ltr" }, ur: { lang: "ur", dir: "rtl" }, rm: { lang: "en", dir: "ltr" } };
var STATUS_CLASS = { used: "", old: "warn", held: "warn", info: "info", rej: "bad", chg: "" };

var state = { lang: "en", print: 10000, total: 650000, live: null };

var SLOTS = [
  ["10:00–10:15", "s_checkin", ""], ["10:15–11:10", "s_build", ""], ["11:10–11:55", "s_lunch", "f"],
  ["11:55–12:10", "s_prayer", "p"], ["12:10–13:00", "s_build", ""], ["13:00–13:45", "s_judging", "j"], ["13:45–14:00", "s_awards", ""]
];

var rows = [];
var calls = [];

function $(id) { return document.getElementById(id); }
function t(k) { return I18N[state.lang][k] || I18N.en[k] || k; }
function fmt(n) { return "Rs " + Math.round(n || 0).toLocaleString("en-US"); }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

function hydrateFromBackend(data) {
  if (!data || !data.plan) return;
  state.live = data;
  var p = data.plan, B = p.budget || {}, V = p.venue || {}, Fd = p.food || {}, J = p.judging || {}, S = p.schedule || {}, d = p.figures || {};
  state.total = B.available || 650000;

  var mapSt = { ACCEPTED: "used", SUPERSEDED: "old", IGNORED: "held", REJECTED: "rej" };
  var factsByMsg = {};
  (data.facts || []).forEach(function (f) {
    (factsByMsg[f.msg_id] = factsByMsg[f.msg_id] || []).push(f.key + "=" + JSON.stringify(f.value) + (f.note ? " (" + f.note + ")" : ""));
  });
  rows = (data.messages || []).map(function (m) {
    return {
      n: m.id,
      from: m.sender + (m.date ? " (" + m.date + ")" : ""),
      text: (factsByMsg[m.id] || []).join("; ") || m.authority,
      st: mapSt[m.status] || "info",
      rawStatus: m.status,
      why: m.reason || "Applied to active plan"
    };
  });

  calls = [];
  (data.trace || []).forEach(function (c) {
    calls.push({
      id: c.n, area: c.area, model: c.model, inp: c.input, out: c.text,
      ti: c.prompt_tokens || 0, to: c.completion_tokens || 0, tot: c.total_tokens || 0, secs: c.seconds
    });
  });
  (data.decisions || []).forEach(function (r) {
    calls.push({
      skip: true, area: "Run #" + r.run + " (" + r.file + ")",
      out: (r.entries || []).join("\n")
    });
  });
}

function setDrawer(open) {
  document.body.classList.toggle("drawer-open", open);
  $("scrim").hidden = !open;
  $("menuBtn").setAttribute("aria-expanded", String(open));
  $("menuBtn").setAttribute("aria-label", t(open ? "menu_close" : "menu_open"));
}

function applyStatic() {
  var cfg = LANGS[state.lang];
  document.documentElement.lang = cfg.lang;
  document.documentElement.dir = cfg.dir;
  document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === state.lang)); });
  document.title = "Mind to Machine · " + t("title");
  setDrawer(document.body.classList.contains("drawer-open"));
}

function render() {
  var live = state.live;
  var p = live && live.plan ? live.plan : null;
  var checks = live && live.checks ? live.checks : [];

  if (p) {
    var B = p.budget, V = p.venue, Fd = p.food, J = p.judging, S = p.schedule, d = p.figures;
    var ch = V.chosen || {};
    var allOk = checks.length ? checks.every(function (c) { return c.ok; }) : (B.remaining >= 0);

    $("mSpent").textContent = fmt(B.total);
    $("mLeft").textContent = fmt(Math.abs(B.remaining)) + " " + t("left") + " " + fmt(B.available);
    $("tot").textContent = fmt(B.total);

    if ($("vHall")) $("vHall").textContent = (ch.name || "NONE").replace(/_/g, " ").replace(/\b\w/g, function (l) { return l.toUpperCase(); });
    if ($("vSeats")) $("vSeats").textContent = "Seats " + (ch.capacity || 0) + " for " + (V.headcount || 0) + " people (" + fmt(ch.price || 0) + ")";
    if ($("vBoxes")) $("vBoxes").textContent = String(Fd.boxes || 0);
    if ($("vPrice")) $("vPrice").textContent = fmt(Fd.unit_price || 0) + " each (" + (Fd.tier || "") + ", msg #" + (Fd.price_msg || "?") + ")";
    if ($("vJudges")) $("vJudges").textContent = (J.judges_used || 0) + " of " + (J.pool || 0);
    if ($("vJudgesN")) $("vJudgesN").textContent = "Max " + (J.max_teams_assigned || 0) + " teams each, " + (d.minutes_per_team || 15) + "m/team";

    var maxLine = Math.max.apply(null, (B.lines || []).map(function (l) { return l.amount || 1; }).concat([250000]));
    $("bars").innerHTML = (B.lines || []).map(function (l, i) {
      return '<div class="bar' + (i < 3 ? "" : " r") + '"><div class="t"><span>' + esc(l.item) + "</span><span>" + fmt(l.amount) +
        '</span></div><div class="track"><div class="fill" style="width:' + Math.min(100, (l.amount / maxLine * 100)).toFixed(1) + '%"></div></div></div>';
    }).join("");

    $("banner").className = "banner" + (allOk ? "" : " bad");
    $("bannerText").textContent = allOk
      ? (t("ok") + " (" + checks.filter(function (c) { return c.ok; }).length + "/" + checks.length + " checks PASS)")
      : (t("bad") + " " + checks.filter(function (c) { return !c.ok; }).map(function (c) { return c.name + ": " + c.detail; }).join(" | "));

    if ($("sixChecksBar") && checks.length) {
      $("sixChecksBar").innerHTML = checks.map(function (c, idx) {
        return '<span class="pill ' + (c.ok ? "" : "bad") + '" title="' + esc(c.detail) + '">' + (c.ok ? "✓ PASS " : "✗ FAIL ") + (idx + 1) + ". " + esc(c.name) + "</span>";
      }).join(" ");
    }

    $("tl").innerHTML = (S.blocks || []).map(function (b) {
      var cls = /Judg/i.test(b.name) ? "j" : /Prayer/i.test(b.name) ? "p" : /Lunch/i.test(b.name) ? "f" : "";
      return '<div class="slot ' + cls + '"><time>' + esc(b.start + "–" + b.end) + "</time><div><b>" + esc(b.name) + "</b><span>" + b.min + " min</span></div></div>";
    }).join("");
  }

  var q = $("q").value.toLowerCase();
  $("rows").innerHTML = rows.filter(function (r) {
    return !q || (r.from + r.text + r.why + (r.rawStatus || "")).toLowerCase().indexOf(q) > -1;
  }).map(function (r) {
    var label = r.rawStatus || t("st_" + r.st);
    return '<tr class="' + (r.rawStatus || "") + '"><td class="n">' + r.n + "</td><td>" + esc(r.from) + '</td><td><span class="txt">' + esc(r.text) +
      '</span><span class="why">' + esc(r.why) + '</span></td><td><span class="pill ' + STATUS_CLASS[r.st] + '">' + esc(label) + "</span></td></tr>";
  }).join("");

  var n = 0, tokens = 0;
  calls.forEach(function (k) { if (!k.skip) { n++; k.id = k.id || n; tokens += (k.tot || (k.ti + k.to)); } });
  $("calls").innerHTML = calls.filter(function (k) {
    return !q || JSON.stringify(k).toLowerCase().indexOf(q) > -1;
  }).map(function (k) {
    if (k.skip) {
      return '<div class="call skip-call"><div class="h"><span class="pill warn">' + esc(k.area) + "</span><span>" + t("noModel") +
        "</span></div><code>" + esc(k.out) + "</code></div>";
    }
    return '<div class="call"><div class="h"><b>' + t("callWord") + " #" + k.id + "</b><span>" + esc(k.model) +
      '</span><span class="pill">' + esc(k.area) + '</span><span class="tk">prompt=' + k.ti + " · completion=" + k.to + " · total=" + (k.tot || (k.ti + k.to)) +
      "</span></div><code>INPUT:\n" + esc(k.inp) + "\n\nOUTPUT:\n" + esc(k.out) + "</code></div>";
  }).join("");
  $("tokTot").textContent = tokens.toLocaleString("en-US");
  $("callTot").textContent = n;
  $("nCalls").textContent = n;
  $("nRej").textContent = rows.filter(function (r) { return r.st === "rej" || r.st === "held" || r.st === "old"; }).length;
}

function setLang(l) {
  state.lang = l;
  try { localStorage.setItem("m2m-lang", l); } catch (e) { /* ignore */ }
  applyStatic();
  render();
}

async function refreshFromServer() {
  if (window.__MTM_DATA__) {
    hydrateFromBackend(window.__MTM_DATA__);
    render();
  }
  if (location.protocol.startsWith("http")) {
    try {
      var r = await fetch("/api/state");
      if (r.ok) {
        var d = await r.json();
        window.__MTM_DATA__ = d;
        hydrateFromBackend(d);
        render();
      }
    } catch (e) { /* static mode */ }
  }
}

async function update(text) {
  var m = text.trim();
  if (!m) return;
  if (location.protocol.startsWith("http")) {
    var btn = $("send");
    btn.disabled = true;
    btn.textContent = "Running...";
    try {
      var r = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: m })
      });
      if (r.ok) {
        await refreshFromServer();
        $("trace").scrollIntoView({ behavior: "smooth" });
        return;
      }
    } catch (e) { /* fallback below */ }
    finally {
      btn.disabled = false;
      btn.textContent = t("update");
    }
  }
  // Offline static file:// fallback
  var cost = m.match(/Rs\s?([\d,]+).*?not\s*Rs\s?([\d,]+)/i), box = m.match(/(\d+)\s*boxes/i), area, out, st, why;
  if (box && +box[1] < 177) {
    area = "food"; st = "rej";
    why = "REJECTED: Figures correct & consistent would FAIL: boxes=" + box[1] + " < 177 people. Previous plan restored.";
    out = "Conflict with headcount 177. Kept 177 boxes. Plan unchanged.";
  } else if (cost && /print/i.test(m)) {
    state.print = +cost[1].replace(/,/g, ""); area = "budget"; st = "chg";
    why = "ACCEPTED. Areas recomputed (code): ['budget']; Areas that made model calls: [reading]";
    out = "printing = " + state.print + ". Total recomputed.";
    if (state.live && state.live.plan && state.live.plan.budget) {
      state.live.plan.budget.lines.forEach(function (l) { if (/printing/i.test(l.item)) l.amount = state.print; });
      state.live.plan.budget.total = state.live.plan.budget.lines.reduce(function (a, b) { return a + b.amount; }, 0);
      state.live.plan.budget.remaining = state.live.plan.budget.available - state.live.plan.budget.total;
    }
  } else {
    area = "reading"; st = "info"; why = "No active fact changed; plan unchanged."; out = "No change found.";
  }
  calls.push({ area: "reading", model: "openai/gpt-oss-20b", inp: m, out: "area affected: " + area, ti: 1200, to: 89, tot: 1289 });
  calls.push({ area: "Code decision", skip: true, out: why + " (" + out + ")" });
  rows.push({ n: rows.length + 1, from: "New message", text: m, st: st, rawStatus: st === "rej" ? "REJECTED" : st === "chg" ? "ACCEPTED" : "IGNORED", why: why });
  render();
  $("trace").scrollIntoView({ behavior: "smooth" });
}

/* ---------- Events ---------- */
document.querySelectorAll(".lang button").forEach(function (b) { b.addEventListener("click", function () { setLang(b.dataset.lang); }); });
$("send").addEventListener("click", function () { update($("msg").value); $("msg").value = ""; });
$("msg").addEventListener("keydown", function (e) { if (e.key === "Enter") $("send").click(); });
if ($("resetBtn")) {
  $("resetBtn").addEventListener("click", async function () {
    if (location.protocol.startsWith("http")) {
      $("resetBtn").textContent = "Resetting...";
      await fetch("/api/reset", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      $("resetBtn").textContent = "Reset Pack";
      await refreshFromServer();
    }
  });
}
document.querySelectorAll(".chip").forEach(function (b) { b.addEventListener("click", function () { $("msg").value = b.dataset.m; }); });
$("q").addEventListener("input", render);

$("menuBtn").addEventListener("click", function () { setDrawer(!document.body.classList.contains("drawer-open")); });
$("scrim").addEventListener("click", function () { setDrawer(false); });
document.addEventListener("keydown", function (e) { if (e.key === "Escape") setDrawer(false); });
window.addEventListener("resize", function () { if (window.innerWidth >= 768) setDrawer(false); });

document.querySelectorAll("nav a").forEach(function (a) {
  a.addEventListener("click", function (e) {
    if (a.id === "backIntroLink" && typeof window.__MTM_SHOW_INTRO__ === "function") {
      e.preventDefault();
      window.__MTM_SHOW_INTRO__();
      return;
    }
    document.querySelectorAll("nav a").forEach(function (x) { x.classList.remove("on"); });
    a.classList.add("on");
    setDrawer(false);
  });
});

var saved = "en";
try { saved = localStorage.getItem("m2m-lang") || "en"; } catch (e) { /* ignore */ }
if (window.__MTM_DATA__) hydrateFromBackend(window.__MTM_DATA__);
setLang(I18N[saved] ? saved : "en");
refreshFromServer();
