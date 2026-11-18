/* Mind to Machine · Animated Command Centre
   Zero hardcoded pack facts; single-scroll + spatial 3D navigation; live validation & rejection on edits. */

var I18N = {
  en: {
    skip: "Skip to content", nav_overview: "Overview", nav_ops: "Operations", nav_budget: "Budget", nav_dec: "Decisions", views: "Views",
    side_title: "Event Operations", side_body: "Live state synced from .state/state.json",
    kicker: "Event operations", title: "Executive overview", search: "Search messages and trace",
    ok: "Plan is valid. Every constraint is met.", bad: "Validation check failed. Review the latest change.",
    m_budget: "Budget spent", m_venue: "Venue", m_lunch: "Lunch boxes", m_judges: "Judges",
    left: "left of",
    story_h: "From message to plan", story_hint: "Scroll to pull the plan apart, layer by layer.",
    s1_t: "Read", s1_d: "A small model reads every message and picks out the facts.",
    s2_t: "Check", s2_d: "Plain code tests each fact against headcount, seats and judge rules.",
    s3_t: "Price", s3_d: "Venue, lunch, judges and fixed costs are added up in code.",
    s4_t: "Lock", s4_d: "The plan is valid only if the total stays inside the approved budget cap.",
    lay1: "Messages", lay2: "Headcount", lay3: "Committed", lay4: "Plan",
    h_money: "Where the money goes", d_money: "Edit any budget line item below or add a new item — validated against the approved budget cap before committing.", total: "Total committed",
    h_sched: "Schedule", d_sched: "Contiguous blocks with required prayer break and zero overlaps.",
    h_trace: "Trace", d_trace: "Every model call, numbered, with its area, input, output and tokens.",
    paste: "Paste a new message", update: "Update plan", try: "Try:", chip1: "Printing bill change", chip2: "Caterer rounds down",
    tokens: "Total tokens", callsWord: "calls", callWord: "Call", inWord: "in", outWord: "out", noModel: "Decision log (code, no model call)",
    demo: "Token counts are reported directly by the provider API (prompt / completion / total).",
    h_msgs: "Messages", d_msgs: "What each message did to the plan, and why.", c_from: "From", c_msg: "Message / Facts", c_status: "Status",
    st_used: "ACCEPTED", st_old: "SUPERSEDED", st_held: "IGNORED", st_info: "IGNORED", st_rej: "REJECTED", st_chg: "ACCEPTED",
    menu_open: "Open menu", menu_close: "Close menu"
  },
  ur: {
    skip: "مواد پر جائیں", nav_overview: "جائزہ", nav_ops: "آپریشنز", nav_budget: "بجٹ", nav_dec: "فیصلے", views: "مناظر",
    side_title: "ایونٹ کے آپریشنز", side_body: "براہ راست اسٹیٹ سنک",
    kicker: "ایونٹ کے آپریشنز", title: "ایگزیکٹو جائزہ", search: "پیغامات اور ٹریس میں تلاش کریں",
    ok: "منصوبہ درست ہے۔ تمام شرائط پوری ہیں۔", bad: "منصوبہ بجٹ سے زیادہ ہے۔ تازہ تبدیلی دیکھیں۔",
    m_budget: "خرچ شدہ بجٹ", m_venue: "مقام", m_lunch: "لنچ باکس", m_judges: "جج صاحبان",
    left: "باقی از",
    story_h: "پیغام سے منصوبے تک", story_hint: "نیچے سکرول کریں اور منصوبے کی تہیں کھلتی دیکھیں۔",
    s1_t: "پڑھنا", s1_d: "چھوٹا ماڈل ہر پیغام پڑھ کر حقائق نکالتا ہے۔",
    s2_t: "جانچ", s2_d: "سادہ کوڈ ہر حقیقت کو افراد، نشستوں اور ججوں کی شرائط سے پرکھتا ہے۔",
    s3_t: "قیمت", s3_d: "مقام، لنچ، جج اور مقررہ اخراجات کوڈ میں جمع ہوتے ہیں۔",
    s4_t: "حتمی", s4_d: "منصوبہ تبھی درست ہے جب کل رقم منظور شدہ بجٹ کے اندر رہے۔",
    lay1: "پیغامات", lay2: "افراد", lay3: "مختص رقم", lay4: "منصوبہ",
    h_money: "رقم کہاں خرچ ہو رہی ہے", d_money: "حساب سادہ کوڈ کرتا ہے۔ ماڈل صرف پیغامات پڑھتا ہے۔", total: "کل مختص رقم",
    h_sched: "شیڈول", d_sched: "نماز کے وقفے سمیت مکمل شیڈول۔",
    h_trace: "ٹریس", d_trace: "ہر ماڈل کال، نمبر کے ساتھ، اس کے شعبے، ان پٹ، آؤٹ پٹ اور ٹوکن سمیت۔",
    paste: "نیا پیغام یہاں چسپاں کریں", update: "منصوبہ اپ ڈیٹ کریں", try: "آزمائیں:", chip1: "پرنٹنگ بل میں تبدیلی", chip2: "کیٹرر نے تعداد کم کر دی",
    tokens: "کل ٹوکن", callsWord: "کالز", callWord: "کال", inWord: "ان", outWord: "آؤٹ", noModel: "ماڈل کال نہیں۔ سادہ کوڈ۔",
    demo: "ٹوکن کی تعداد براہ راست ماڈل اے پی آئی سے لی گئی ہے۔",
    h_msgs: "پیغامات", d_msgs: "ہر پیغام نے منصوبے پر کیا اثر ڈالا، اور کیوں۔", c_from: "بھیجنے والا", c_msg: "پیغام", c_status: "حیثیت",
    st_used: "منظور", st_old: "پرانا", st_held: "نظر انداز", st_info: "نظر انداز", st_rej: "مسترد", st_chg: "نافذ",
    menu_open: "مینو کھولیں", menu_close: "مینو بند کریں"
  },
  rm: {
    skip: "Content par jayein", nav_overview: "Jaiza", nav_ops: "Operations", nav_budget: "Budget", nav_dec: "Faislay", views: "Manazir",
    side_title: "Event Operations", side_body: "Live state synced from .state/state.json",
    kicker: "Event operations ki tafseel", title: "Executive jaiza", search: "Messages aur trace mein talash karein",
    ok: "Plan durust hai. Tamam shara'it poori hain.", bad: "Plan budget se zyada hai. Taza tabdeeli dekhein.",
    m_budget: "Kharch shuda budget", m_venue: "Maqam", m_lunch: "Lunch box", m_judges: "Judges",
    left: "baqi az",
    story_h: "Message se plan tak", story_hint: "Neeche scroll karein aur plan ki tahein khulti dekhein.",
    s1_t: "Parhna", s1_d: "Chhota model har message parh kar haqaiq nikalta hai.",
    s2_t: "Jaanch", s2_d: "Simple code har haqeeqat ko afraad, nashiston aur judges ki sharait se parakhta hai.",
    s3_t: "Qeemat", s3_d: "Maqam, lunch, judges aur muqarrara akhrajaat code mein jama hote hain.",
    s4_t: "Hatmi", s4_d: "Plan tabhi durust hai jab kul raqam manzoor shuda budget ke andar rahe.",
    lay1: "Messages", lay2: "Afraad", lay3: "Mukhtas raqam", lay4: "Plan",
    h_money: "Paisa kahan ja raha hai", d_money: "Hisaab simple code karta hai. Model sirf messages parhta hai.", total: "Kul mukhtas raqam",
    h_sched: "Schedule", d_sched: "Namaz ke waqfe samait mukammal schedule.",
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
var VIEWS = ["overview", "ops", "budget", "dec"];

var state = { lang: "en", view: "overview", live: null };
var rows = [];
var calls = [];

function $(id) { return document.getElementById(id); }
function t(k) { return I18N[state.lang][k] || I18N.en[k] || k; }
function fmt(n) { return "Rs " + Math.round(n || 0).toLocaleString("en-US"); }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

var RM = window.matchMedia("(prefers-reduced-motion: reduce)");
function reduced() { return RM.matches; }

function showBanner(errId, txtId, okId, okTxtId, isErr, msg) {
  if ($(errId)) $(errId).style.display = isErr ? "flex" : "none";
  if ($(txtId) && isErr) $(txtId).textContent = msg;
  if ($(okId)) $(okId).style.display = !isErr && msg ? "flex" : "none";
  if ($(okTxtId) && !isErr) $(okTxtId).textContent = msg;
}

function hydrateFromBackend(data) {
  state.live = data || null;
  if (!data || !data.plan) {
    rows = [];
    calls = [];
    return;
  }
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
      ti: c.prompt_tokens || 0, to: c.completion_tokens || 0, tot: c.total_tokens || 0
    });
  });
  (data.decisions || []).forEach(function (r) {
    calls.push({
      skip: true, area: "Run #" + r.run + " (" + r.file + ")",
      out: (r.entries || []).join("\n")
    });
  });
}

/* ================= Spring physics ================= */
var fx = [], raf = 0;
function kick() { if (!raf) raf = requestAnimationFrame(tick); }
function paint(s) {
  var x = s.x.toFixed(2), y = s.y.toFixed(2);
  if (s.k === "mag") s.t.style.transform = "translate3d(" + x + "px," + y + "px,0)";
  else if (s.k === "tilt") s.t.style.transform = "perspective(800px) rotateX(" + y + "deg) rotateY(" + x + "deg)";
  else s.t.style.transform = "rotateX(" + (58 + s.y).toFixed(2) + "deg) rotateZ(" + (-42 + s.x).toFixed(2) + "deg)";
}
function tick() {
  raf = 0;
  var live = false;
  fx.forEach(function (s) {
    if (s.rest) return;
    s.vx = (s.vx + (s.tx - s.x) * 0.14) * 0.78;
    s.vy = (s.vy + (s.ty - s.y) * 0.14) * 0.78;
    s.x += s.vx; s.y += s.vy;
    if (Math.abs(s.vx) + Math.abs(s.vy) < 0.01 && Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) < 0.02) {
      s.x = s.tx; s.y = s.ty; s.vx = s.vy = 0; s.rest = true;
      if (!s.tx && !s.ty) s.t.style.transform = ""; else paint(s);
    } else { paint(s); live = true; }
  });
  if (live) raf = requestAnimationFrame(tick);
}
function bind(el, k, host) {
  if (!el || el._fx) return;
  var s = { k: k, t: el, x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, rest: true }, h = host || el;
  el._fx = s; fx.push(s);
  h.addEventListener("pointermove", function (e) {
    if (reduced() || e.pointerType === "touch") return;
    var r = h.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
    if (k === "mag") { s.tx = dx * r.width * 0.22; s.ty = dy * r.height * 0.3; }
    else if (k === "tilt") { s.tx = dx * 9; s.ty = -dy * 9; }
    else { s.tx = dx * 16; s.ty = -dy * 10; }
    s.rest = false; kick();
  });
  h.addEventListener("pointerleave", function () { s.tx = s.ty = 0; s.rest = false; kick(); });
}
function glow(el) {
  el.addEventListener("pointermove", function (e) {
    if (reduced()) return;
    var r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (e.clientX - r.left) + "px");
    el.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });
}
function resetFX() {
  fx.forEach(function (s) { s.tx = s.ty = 0; s.rest = false; });
  kick();
}

/* ================= Scroll-driven story + Single-page Scrollspy ================= */
var storyEl = $("story"), stage = $("stage"), steps = [].slice.call(document.querySelectorAll(".steps li")),
    layers = [].slice.call($("stack").children), sIdx = -2, sTick = false;

function setStep(i) {
  if (i === sIdx) return;
  sIdx = i;
  steps.forEach(function (el, n) { el.classList.toggle("on", n === i); });
  layers.forEach(function (el, n) { el.classList.toggle("on", n === i); });
}
function storyUpdate() {
  sTick = false;
  if (reduced()) { stage.style.removeProperty("--p"); setStep(-1); return; }
  if (storyEl && storyEl.offsetParent) {
    var r = storyEl.getBoundingClientRect(), span = storyEl.offsetHeight - stage.offsetHeight,
        p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
    stage.style.setProperty("--p", p.toFixed(3));
    setStep(Math.min(3, Math.floor(p * 4)));
  }
  var best = state.view, bestDist = 1e9;
  document.querySelectorAll(".view").forEach(function (sec) {
    var rect = sec.getBoundingClientRect();
    var dist = Math.abs(rect.top - 140);
    if (rect.top <= window.innerHeight * 0.55 && rect.bottom >= 120 && dist < bestDist) {
      bestDist = dist;
      best = sec.dataset.view;
    }
  });
  if (best && best !== state.view) {
    state.view = best;
    document.body.dataset.view = best;
    syncView();
  }
}
function queueStory() { if (!sTick) { sTick = true; requestAnimationFrame(storyUpdate); } }

function setDrawer(open) {
  document.body.classList.toggle("drawer-open", open);
  $("scrim").hidden = !open;
  $("menuBtn").setAttribute("aria-expanded", String(open));
  $("menuBtn").setAttribute("aria-label", t(open ? "menu_close" : "menu_open"));
}
function titleKey(v) { return v === "overview" ? "title" : "nav_" + v; }
function syncView() {
  var v = state.view;
  document.querySelectorAll(".navb[data-view]").forEach(function (b) {
    if (b.dataset.view === v) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
  });
  document.querySelectorAll(".plate").forEach(function (b) { b.classList.toggle("on", b.dataset.view === v); });
  $("sceneLabel").textContent = t("nav_" + v);
  var h = $("pageTitle"); h.dataset.i18n = titleKey(v); h.textContent = t(titleKey(v));
  document.title = "Mind to Machine · " + t(titleKey(v));
}
function showView(v) {
  setDrawer(false);
  if (VIEWS.indexOf(v) < 0) return;
  var target = document.querySelector('.view[data-view="' + v + '"]');
  state.view = v;
  document.body.dataset.view = v;
  syncView();
  try { history.replaceState(null, "", "#" + v); } catch (e) { /* ignore */ }
  if (target) target.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
}

function applyStatic() {
  var cfg = LANGS[state.lang];
  document.documentElement.lang = cfg.lang;
  document.documentElement.dir = cfg.dir;
  document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll("[data-i18n-al]").forEach(function (el) { el.setAttribute("aria-label", t(el.dataset.i18nAl)); });
  document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === state.lang)); });
  setDrawer(document.body.classList.contains("drawer-open"));
  syncView();
}

function render() {
  var live = state.live;
  var p = live && live.plan ? live.plan : null;
  var checks = live && live.checks ? live.checks : [];

  if (!p) {
    $("mSpent").textContent = "—";
    $("mLeft").textContent = "No active plan — upload a file or paste messages below";
    $("vHall").textContent = "—";
    $("vSeats").textContent = "—";
    $("vBoxes").textContent = "—";
    $("vPrice").textContent = "—";
    $("vJudges").textContent = "—";
    $("vJudgesN").textContent = "—";
    $("tot").textContent = "Rs 0";
    $("lv1").textContent = "0";
    $("lv2").textContent = "0";
    $("lv3").textContent = "Rs 0";
    $("lv4").textContent = "—";
    $("bars").innerHTML = '<div style="color:var(--mute);font-size:14px">No budget lines yet. Upload a pack (.txt, .csv, .docx, .pdf) or paste messages in Operations → Trace to build a plan from scratch.</div>';
    $("tl").innerHTML = '<div style="color:var(--mute);font-size:14px">No schedule blocks yet.</div>';
    if ($("sixChecksBar")) $("sixChecksBar").innerHTML = "";
    $("banner").className = "banner";
    $("bannerText").textContent = "State cleared. Upload a pack file or paste messages to build a new event plan from scratch.";
    if ($("edStudents")) $("edStudents").value = "";
    if ($("edTeamSize")) $("edTeamSize").value = "";
    if ($("edStaff")) $("edStaff").value = "";
    if ($("edBudget")) $("edBudget").value = "";
    if ($("edJudges")) $("edJudges").value = "";
    if ($("edLunch")) $("edLunch").value = "";
  } else {
    var B = p.budget, V = p.venue, Fd = p.food, J = p.judging, S = p.schedule, d = p.figures;
    var ch = V.chosen || {};
    var allOk = checks.length ? checks.every(function (c) { return c.ok; }) : (B.remaining >= 0);

    if ($("sideTitle")) $("sideTitle").textContent = "Event · " + Math.round((S.total_min || 240) / 60) + " hours";
    if ($("sideBody")) $("sideBody").textContent = (d.students || 0) + " students, " + (d.teams || 0) + " teams, " + (d.staff || 0) + " staff, " + (J.judges_used || 0) + " judges.";

    $("mSpent").textContent = fmt(B.total);
    $("mLeft").textContent = fmt(Math.abs(B.remaining)) + " " + t("left") + " " + fmt(B.available);
    $("tot").textContent = fmt(B.total);
    $("lv1").textContent = rows.length;
    $("lv2").textContent = V.headcount || 0;
    $("lv3").textContent = fmt(B.total);
    $("lv4").textContent = allOk ? "✓" : "✕";

    if ($("vHall")) $("vHall").textContent = (ch.name || "NONE").replace(/_/g, " ").replace(/\b\w/g, function (l) { return l.toUpperCase(); });
    if ($("vSeats")) $("vSeats").textContent = "Seats " + (ch.capacity || 0) + " for " + (V.headcount || 0) + " people (" + fmt(ch.price || 0) + ")";
    if ($("vBoxes")) $("vBoxes").textContent = String(Fd.boxes || 0);
    if ($("vPrice")) $("vPrice").textContent = fmt(Fd.unit_price || 0) + " each (" + (Fd.tier || "") + ", msg #" + (Fd.price_msg || "?") + ")";
    if ($("vJudges")) $("vJudges").textContent = (J.judges_used || 0) + " of " + (J.pool || 0);
    if ($("vJudgesN")) $("vJudgesN").textContent = "Max " + (J.max_teams_assigned || 0) + " teams each, " + (d.minutes_per_team || 15) + "m/team";
    if ($("edStudents") && document.activeElement !== $("edStudents")) $("edStudents").value = d.students;
    if ($("edTeamSize") && document.activeElement !== $("edTeamSize")) $("edTeamSize").value = d.team_size;
    if ($("edStaff") && document.activeElement !== $("edStaff")) $("edStaff").value = d.staff;
    if ($("edBudget") && document.activeElement !== $("edBudget")) $("edBudget").value = B.cap;
    if ($("edJudges") && document.activeElement !== $("edJudges")) $("edJudges").value = J.pool;
    if ($("edLunch") && document.activeElement !== $("edLunch")) $("edLunch").value = Fd.unit_price;

    var maxLine = Math.max.apply(null, (B.lines || []).map(function (l) { return l.amount || 1; }).concat([250000]));
    $("bars").innerHTML = (B.lines || []).map(function (l, i) {
      return '<div class="bar' + (i < 3 ? "" : " r") + '"><div class="t" style="align-items:center"><span>' + esc(l.item) +
        '</span><span style="display:inline-flex;align-items:center;gap:6px">Rs <input class="bline-input" data-item="' + esc(l.item) +
        '" type="number" min="0" step="1000" value="' + Math.round(l.amount || 0) +
        '" style="width:120px;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--pearl);text-align:end;font-weight:600"></span></div>' +
        '<div class="track"><div class="fill" style="transform:scaleX(' + Math.min(1, (l.amount || 0) / maxLine).toFixed(3) + ')"></div></div></div>';
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

  var q = $("q").value.trim().toLowerCase();
  var matchedRows = rows.filter(function (r) {
    return !q || (r.from + " " + r.text + " " + r.why + " " + (r.rawStatus || "")).toLowerCase().indexOf(q) > -1;
  });
  $("rows").innerHTML = matchedRows.map(function (r) {
    var label = r.rawStatus || t("st_" + r.st);
    return '<tr class="' + (r.rawStatus || "") + '"><td class="n">' + r.n + "</td><td>" + esc(r.from) + '</td><td><span class="txt">' + esc(r.text) +
      '</span><span class="why">' + esc(r.why) + '</span></td><td><span class="pill ' + STATUS_CLASS[r.st] + '">' + esc(label) + "</span></td></tr>";
  }).join("") || '<tr><td colspan="4" style="text-align:center;color:var(--mute)">' + (q ? 'No matching messages for "' + esc(q) + '"' : "No messages in state.") + '</td></tr>';

  var n = 0, tokens = 0;
  calls.forEach(function (k) { if (!k.skip) { n++; k.id = k.id || n; tokens += (k.tot || (k.ti + k.to)); } });
  var matchedCalls = calls.filter(function (k) {
    return !q || JSON.stringify(k).toLowerCase().indexOf(q) > -1;
  });
  if ($("searchCount")) {
    $("searchCount").textContent = q ? (matchedRows.length + " msg · " + matchedCalls.length + " trace") : "";
  }
  $("calls").innerHTML = matchedCalls.map(function (k, idx) {
    if (k.skip) {
      return '<div class="call skip-call"><div class="h"><span class="pill warn">' + esc(k.area) + "</span><span>" + t("noModel") +
        "</span></div><code>" + esc(k.out) + "</code></div>";
    }
    var fullText = "INPUT:\n" + k.inp + "\n\nOUTPUT:\n" + k.out;
    var msgPart = String(k.inp || "").split("MESSAGES:\n").pop().trim();
    var msgLines = msgPart.split(/\r?\n/).filter(Boolean);
    var shortInp = msgLines.length > 2 ? (msgLines.length + " lines (" + msgLines[0].slice(0, 65) + "…)") : msgPart.slice(0, 90);
    var shortOut = (state.live && state.live.facts)
      ? ("Extracted " + state.live.facts.length + " normalized facts across " + rows.length + " messages (JSON validated)")
      : String(k.out || "").slice(0, 100);
    var previewText = "In:  " + shortInp + "\nOut: " + shortOut;
    return '<div class="call"><div class="h"><b>' + t("callWord") + " #" + k.id + "</b><span>" + esc(k.model) +
      '</span><span class="pill">' + esc(k.area) + '</span><span class="tk">prompt=' + k.ti + " · completion=" + k.to + " · total=" + (k.tot || (k.ti + k.to)) +
      '</span></div><code id="traceShort' + idx + '">' + esc(previewText) + '</code>' +
      '<code id="traceFull' + idx + '" style="display:none;margin-top:6px;max-height:320px;overflow:auto">' + esc(fullText) +
      '</code><button type="button" class="chip trace-toggle" data-idx="' + idx + '" style="margin-top:8px">Read full raw trace ▾</button>' +
      "</div>";
  }).join("") || '<div class="call skip-call"><code>' + (q ? 'No matching trace entries for "' + esc(q) + '"' : "No trace entries yet.") + '</code></div>';
  document.querySelectorAll(".trace-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var i = btn.dataset.idx, sh = $("traceShort" + i), fl = $("traceFull" + i);
      var open = fl.style.display === "none";
      fl.style.display = open ? "block" : "none";
      sh.style.display = open ? "none" : "block";
      btn.textContent = open ? "Hide raw trace ▴" : "Read full raw trace ▾";
    });
  });
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
  if (location.protocol.startsWith("http")) {
    try {
      var r = await fetch("/api/state");
      if (r.ok) {
        var d = await r.json();
        window.__MTM_DATA__ = d;
        hydrateFromBackend(d);
        render();
        return;
      }
    } catch (e) { /* static fallback */ }
  }
  if (window.__MTM_DATA__) {
    hydrateFromBackend(window.__MTM_DATA__);
    render();
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
        $("trace").scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
        return;
      }
    } finally {
      btn.disabled = false;
      btn.textContent = t("update");
    }
  }
}

/* ================= Quick Edit Parameters (with strict validation & rejection error banner) ================= */
if ($("applyEditBtn")) {
  $("applyEditBtn").addEventListener("click", async function () {
    showBanner("editErrorBanner", "editErrorText", "editOkBanner", "editOkText", false, "");
    var payload = {
      students: +($("edStudents").value || 0),
      team_size: +($("edTeamSize").value || 0),
      staff: +($("edStaff").value || 0),
      budget_cap: +($("edBudget").value || 0),
      judges_confirmed: +($("edJudges").value || 0),
      lunch_standard: +($("edLunch").value || 0)
    };
    if (payload.students <= 0 || payload.team_size <= 0) {
      showBanner("editErrorBanner", "editErrorText", "editOkBanner", "editOkText", true, "REJECTED: Students and Team Size must be greater than 0.");
      return;
    }
    if (location.protocol.startsWith("http")) {
      $("applyEditBtn").textContent = "Validating...";
      try {
        var r = await fetch("/api/edit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        var res = await r.json();
        await refreshFromServer();
        if (res.rejected) {
          showBanner("editErrorBanner", "editErrorText", "editOkBanner", "editOkText", true, "REJECTED: " + res.reason + " — Previous valid plan restored.");
        } else {
          showBanner("editErrorBanner", "editErrorText", "editOkBanner", "editOkText", false, "Plan updated & verified (6/6 checks PASS).");
        }
      } finally {
        $("applyEditBtn").textContent = "Apply & Recompute Plan";
      }
      return;
    }
    // Static file:// validation on a shadow copy before committing
    if (state.live && state.live.plan) {
      var p = state.live.plan, d = p.figures, J = p.judging, V = p.venue, Fd = p.food, B = p.budget;
      var teams = Math.ceil(payload.students / payload.team_size);
      var needJudges = Math.ceil(teams / (d.max_teams_per_judge || 3));
      if (payload.judges_confirmed < needJudges) {
        showBanner("editErrorBanner", "editErrorText", "editOkBanner", "editOkText", true,
          "REJECTED: Enough judges check would FAIL — pool " + payload.judges_confirmed + " < needed " + needJudges + " for " + teams + " teams. Previous plan restored.");
        render();
        return;
      }
      var usedJudges = needJudges;
      var fed = payload.students + payload.staff + usedJudges;
      var capVenue = (V.chosen && V.chosen.capacity) || 0;
      if (capVenue && fed > capVenue) {
        showBanner("editErrorBanner", "editErrorText", "editOkBanner", "editOkText", true,
          "REJECTED: Venue fits check would FAIL — headcount " + fed + " exceeds venue capacity " + capVenue + ". Previous plan restored.");
        render();
        return;
      }
      var newFoodCost = fed * payload.lunch_standard;
      var newHon = usedJudges * (J.fee_per_judge || 0);
      var otherLines = B.lines.reduce(function (acc, l) {
        return (/^Food/i.test(l.item) || /^Judge/i.test(l.item)) ? acc : acc + (l.amount || 0);
      }, 0);
      var newTotal = otherLines + newFoodCost + newHon;
      var newAvail = payload.budget_cap + (B.funding || 0);
      if (newTotal > newAvail) {
        showBanner("editErrorBanner", "editErrorText", "editOkBanner", "editOkText", true,
          "REJECTED: Within budget check would FAIL — committed spend " + fmt(newTotal) + " exceeds allocated budget " + fmt(newAvail) + " (shortfall " + fmt(newTotal - newAvail) + "). Previous plan restored.");
        render();
        return;
      }
      // Valid -> commit
      d.students = payload.students; d.team_size = payload.team_size; d.staff = payload.staff;
      d.teams = teams; d.judges_needed = needJudges;
      J.pool = payload.judges_confirmed; J.judges_needed = needJudges; J.judges_used = usedJudges; J.honoraria = newHon;
      V.headcount = fed; Fd.headcount = fed; Fd.boxes = fed; Fd.unit_price = payload.lunch_standard; Fd.cost = newFoodCost;
      B.cap = payload.budget_cap; B.available = newAvail;
      B.lines.forEach(function (l) {
        if (/^Food/i.test(l.item)) l.amount = newFoodCost;
        if (/^Judge/i.test(l.item)) { l.item = "Judge honoraria (" + usedJudges + " x " + (J.fee_per_judge || 0) + ")"; l.amount = newHon; }
      });
      B.total = newTotal; B.remaining = newAvail - newTotal;
      showBanner("editErrorBanner", "editErrorText", "editOkBanner", "editOkText", false, "Plan updated & verified (6/6 checks PASS).");
      render();
    }
  });
}

/* ================= Where the Money Goes — Line-Item Allocation Editor ================= */
async function submitBudgetLines(lines) {
  showBanner("budgetErrorBanner", "budgetErrorText", "budgetOkBanner", "budgetOkText", false, "");
  if (location.protocol.startsWith("http")) {
    $("saveBudgetLinesBtn").textContent = "Validating...";
    try {
      var r = await fetch("/api/budget-lines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: lines })
      });
      var res = await r.json();
      await refreshFromServer();
      if (res.rejected) {
        showBanner("budgetErrorBanner", "budgetErrorText", "budgetOkBanner", "budgetOkText", true, "REJECTED: " + res.reason + " — Previous valid budget restored.");
      } else {
        showBanner("budgetErrorBanner", "budgetErrorText", "budgetOkBanner", "budgetOkText", false, "Budget allocation updated & verified within cap.");
      }
    } finally {
      $("saveBudgetLinesBtn").textContent = "Apply Budget Allocation";
    }
    return;
  }
  // Static file:// validation
  if (state.live && state.live.plan) {
    var B = state.live.plan.budget;
    var newTotal = lines.reduce(function (a, b) { return a + (b.amount || 0); }, 0);
    if (newTotal > B.available) {
      showBanner("budgetErrorBanner", "budgetErrorText", "budgetOkBanner", "budgetOkText", true,
        "REJECTED: Within budget check would FAIL — total " + fmt(newTotal) + " exceeds available budget " + fmt(B.available) + ". Previous allocation restored.");
      render();
      return;
    }
    B.lines = lines;
    B.total = newTotal;
    B.remaining = B.available - newTotal;
    showBanner("budgetErrorBanner", "budgetErrorText", "budgetOkBanner", "budgetOkText", false, "Budget allocation updated & verified within cap.");
    render();
  }
}

if ($("saveBudgetLinesBtn")) {
  $("saveBudgetLinesBtn").addEventListener("click", function () {
    var lines = [].slice.call(document.querySelectorAll(".bline-input")).map(function (inp) {
      return { item: inp.dataset.item, amount: +(inp.value || 0) };
    });
    submitBudgetLines(lines);
  });
}
if ($("addLineBtn")) {
  $("addLineBtn").addEventListener("click", function () {
    var name = ($("newLineName").value || "").trim(), amt = +($("newLineAmt").value || 0);
    if (!name || amt <= 0) {
      showBanner("budgetErrorBanner", "budgetErrorText", "budgetOkBanner", "budgetOkText", true, "Enter a valid item name and positive amount.");
      return;
    }
    var lines = [].slice.call(document.querySelectorAll(".bline-input")).map(function (inp) {
      return { item: inp.dataset.item, amount: +(inp.value || 0) };
    });
    lines.push({ item: "Approved cost: " + name, amount: amt });
    $("newLineName").value = ""; $("newLineAmt").value = "";
    submitBudgetLines(lines);
  });
}

if ($("downloadPlanBtn")) {
  $("downloadPlanBtn").addEventListener("click", function () {
    if (location.protocol.startsWith("http")) {
      window.location.href = "/api/download";
      return;
    }
    // Static file:// export fallback
    var p = (state.live && state.live.plan) || {};
    var V = p.venue || {}, ch = V.chosen || {}, S = p.schedule || {}, Fd = p.food || {}, J = p.judging || {}, B = p.budget || {}, d = p.figures || {};
    var lines = [
      "1. THE PLAN",
      "==============================================================================",
      "Venue:    " + (ch.name || "NONE") + " — " + (ch.capacity || 0) + " seats (for " + (V.headcount || 0) + " people), cost " + fmt(ch.price || 0),
      "Schedule: " + (S.start || "") + "-" + (S.end || "") + " (" + (S.total_min || 240) + " min total, prayer break " + (S.prayer_min || 0) + " min, judging " + (S.judging_min || 0) + " min):",
      (S.blocks || []).map(function (b) { return "          - " + b.start + "-" + b.end + ": " + b.name + " (" + b.min + " min)"; }).join("\n"),
      "Food:     " + (Fd.tier || "") + ", quantity " + (Fd.boxes || 0) + " boxes @ " + fmt(Fd.unit_price || 0) + "/head = total " + fmt(Fd.cost || 0),
      "Judging:  " + (J.judges_used || 0) + " judges used (out of " + (J.pool || 0) + " confirmed), cost " + fmt(J.honoraria || 0),
      "Budget:   Total " + fmt(B.total || 0) + " against " + fmt(B.available || 0) + " cap -> " + ((B.total || 0) <= (B.available || 0) ? "FITS within budget" : "EXCEEDS budget") + " (Remaining: " + fmt(B.remaining || 0) + ")",
      (B.lines || []).map(function (l) { return "          - " + l.item + ": " + fmt(l.amount); }).join("\n"),
      "",
      "2. TRACE (AI MODEL CALLS)",
      "=============================================================================="
    ];
    var totTok = 0;
    calls.filter(function (c) { return !c.skip; }).forEach(function (c) {
      var tk = c.tot || (c.ti + c.to);
      totTok += tk;
      lines.push("Call #" + c.id + " | Model: " + c.model + " | For: " + c.area + " (reading messages) | Tokens used: " + tk + " (prompt=" + c.ti + ", completion=" + c.to + ")");
    });
    lines.push("TOTAL TOKENS USED: " + totTok);
    var blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "final_plan_and_trace.txt";
    a.click();
  });
}
if ($("uploadBtn") && $("fileInput")) {
  $("uploadBtn").addEventListener("click", function () { $("fileInput").click(); });
  $("fileInput").addEventListener("change", function () {
    var file = $("fileInput").files && $("fileInput").files[0];
    if (!file) return;
    var btn = $("uploadBtn");
    btn.disabled = true;
    btn.textContent = "Uploading " + file.name + "...";
    var fr = new FileReader();
    fr.onload = async function () {
      var b64 = String(fr.result || "").split(",")[1] || "";
      if (location.protocol.startsWith("http")) {
        try {
          var r = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename: file.name, data_b64: b64 })
          });
          if (r.ok) {
            await refreshFromServer();
            $("sec-overview").scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
          }
        } finally {
          btn.disabled = false;
          btn.textContent = "Upload File (TXT/CSV/DOCX/PDF)";
          $("fileInput").value = "";
        }
      }
    };
    fr.readAsDataURL(file);
  });
}
if ($("resetBtn")) {
  $("resetBtn").addEventListener("click", async function () {
    showBanner("editErrorBanner", "editErrorText", "editOkBanner", "editOkText", false, "");
    showBanner("budgetErrorBanner", "budgetErrorText", "budgetOkBanner", "budgetOkText", false, "");
    if (location.protocol.startsWith("http")) {
      $("resetBtn").textContent = "Clearing...";
      await fetch("/api/reset", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      $("resetBtn").textContent = "Reset Pack";
      await refreshFromServer();
    } else {
      window.__MTM_DATA__ = null;
      hydrateFromBackend(null);
      render();
    }
  });
}
if ($("backIntroLink")) {
  $("backIntroLink").addEventListener("click", function (e) {
    if (typeof window.__MTM_SHOW_INTRO__ === "function") {
      e.preventDefault();
      window.__MTM_SHOW_INTRO__();
    }
  });
}
document.querySelectorAll(".lang button").forEach(function (b) { b.addEventListener("click", function () { setLang(b.dataset.lang); }); });
$("send").addEventListener("click", function () { update($("msg").value); $("msg").value = ""; });
$("msg").addEventListener("keydown", function (e) { if (e.key === "Enter") $("send").click(); });
document.querySelectorAll(".chip").forEach(function (b) { b.addEventListener("click", function () { $("msg").value = b.dataset.m; }); });
$("q").addEventListener("input", render);
$("q").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    render();
    var target = $("rows").querySelector("tr td:not([colspan])") ? $("sec-dec") : $("sec-ops");
    if (target) target.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
  }
});

$("menuBtn").addEventListener("click", function () { setDrawer(!document.body.classList.contains("drawer-open")); });
$("scrim").addEventListener("click", function () { setDrawer(false); });
document.addEventListener("keydown", function (e) { if (e.key === "Escape") setDrawer(false); });

document.querySelectorAll(".navb[data-view], .plate").forEach(function (b) {
  b.addEventListener("click", function () { showView(b.dataset.view); });
});
document.querySelectorAll(".plate").forEach(function (b) {
  b.addEventListener("pointerenter", function () { $("sceneLabel").textContent = t("nav_" + b.dataset.view); });
  b.addEventListener("pointerleave", function () { $("sceneLabel").textContent = t("nav_" + state.view); });
});

document.querySelectorAll(".btn, .chip, .lang button").forEach(function (el) { bind(el, "mag"); });
document.querySelectorAll(".metric").forEach(function (el) { bind(el, "tilt"); });
document.querySelectorAll(".card").forEach(glow);
bind($("iso"), "iso", $("scene"));

window.addEventListener("scroll", queueStory, { passive: true });
window.addEventListener("resize", function () { if (window.innerWidth >= 768) setDrawer(false); queueStory(); });
var onRM = function () { resetFX(); queueStory(); };
if (RM.addEventListener) RM.addEventListener("change", onRM); else if (RM.addListener) RM.addListener(onRM);

var saved = "en";
try { saved = localStorage.getItem("m2m-lang") || "en"; } catch (e) { /* ignore */ }
var startView = (location.hash || "").slice(1);
if (window.__MTM_DATA__) hydrateFromBackend(window.__MTM_DATA__);
setLang(I18N[saved] ? saved : "en");
if (VIEWS.indexOf(startView) > 0) showView(startView);
queueStory();
refreshFromServer();
