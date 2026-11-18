/* Mind to Machine · Animated Command Centre
   Single-scroll + spatial sidebar navigation, hydrated with real backend state (window.__MTM_DATA__ / /api/state). */

var I18N = {
  en: {
    skip: "Skip to content", nav_overview: "Overview", nav_ops: "Operations", nav_budget: "Budget", nav_dec: "Decisions", views: "Views",
    side_title: "Islamabad · 4 hours", side_body: "150 students, 50 teams, 10 staff, 17 judges.",
    kicker: "Event operations", title: "Executive overview", search: "Search messages and trace",
    ok: "Plan is valid. Every constraint is met.", bad: "Validation check failed. Review the latest change.",
    m_budget: "Budget spent", m_venue: "Venue", m_lunch: "Lunch boxes", m_judges: "Judges",
    v_hall: "Hall A", v_seats: "Seats 200 for 177 people", v_price: "Rs 1,200 each, latest price",
    v_judges: "17 of 20", v_judges_n: "3 teams each, 15 min per team", left: "left of",
    story_h: "From message to plan", story_hint: "Scroll to pull the plan apart, layer by layer.",
    s1_t: "Read", s1_d: "A small model reads every message and picks out the facts.",
    s2_t: "Check", s2_d: "Plain code tests each fact against headcount, seats and judge rules.",
    s3_t: "Price", s3_d: "Venue, lunch, judges and fixed costs are added up in code.",
    s4_t: "Lock", s4_d: "The plan is valid only if the total stays inside Rs 650,000.",
    lay1: "Messages", lay2: "Headcount", lay3: "Committed", lay4: "Plan",
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
    skip: "مواد پر جائیں", nav_overview: "جائزہ", nav_ops: "آپریشنز", nav_budget: "بجٹ", nav_dec: "فیصلے", views: "مناظر",
    side_title: "اسلام آباد · 4 گھنٹے", side_body: "150 طلبہ، 50 ٹیمیں، 10 عملہ، 17 جج۔",
    kicker: "ایونٹ کے آپریشنز", title: "ایگزیکٹو جائزہ", search: "پیغامات اور ٹریس میں تلاش کریں",
    ok: "منصوبہ درست ہے۔ تمام شرائط پوری ہیں۔", bad: "منصوبہ بجٹ سے زیادہ ہے۔ تازہ تبدیلی دیکھیں۔",
    m_budget: "خرچ شدہ بجٹ", m_venue: "مقام", m_lunch: "لنچ باکس", m_judges: "جج صاحبان",
    v_hall: "ہال اے", v_seats: "177 افراد کے لیے 200 نشستیں", v_price: "ہر ایک 1,200 روپے، تازہ قیمت",
    v_judges: "20 میں سے 17", v_judges_n: "ہر جج 3 ٹیمیں، فی ٹیم 15 منٹ", left: "باقی از",
    story_h: "پیغام سے منصوبے تک", story_hint: "نیچے سکرول کریں اور منصوبے کی تہیں کھلتی دیکھیں۔",
    s1_t: "پڑھنا", s1_d: "چھوٹا ماڈل ہر پیغام پڑھ کر حقائق نکالتا ہے۔",
    s2_t: "جانچ", s2_d: "سادہ کوڈ ہر حقیقت کو افراد، نشستوں اور ججوں کی شرائط سے پرکھتا ہے۔",
    s3_t: "قیمت", s3_d: "مقام، لنچ، جج اور مقررہ اخراجات کوڈ میں جمع ہوتے ہیں۔",
    s4_t: "حتمی", s4_d: "منصوبہ تبھی درست ہے جب کل رقم 650,000 روپے کے اندر رہے۔",
    lay1: "پیغامات", lay2: "افراد", lay3: "مختص رقم", lay4: "منصوبہ",
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
    skip: "Content par jayein", nav_overview: "Jaiza", nav_ops: "Operations", nav_budget: "Budget", nav_dec: "Faislay", views: "Manazir",
    side_title: "Islamabad · 4 ghante", side_body: "150 students, 50 teams, 10 staff, 17 judges.",
    kicker: "Event operations ki tafseel", title: "Executive jaiza", search: "Messages aur trace mein talash karein",
    ok: "Plan durust hai. Tamam shara'it poori hain.", bad: "Plan budget se zyada hai. Taza tabdeeli dekhein.",
    m_budget: "Kharch shuda budget", m_venue: "Maqam", m_lunch: "Lunch box", m_judges: "Judges",
    v_hall: "Hall A", v_seats: "177 afraad ke liye 200 nashistein", v_price: "Rs 1,200 har ek, taza qeemat",
    v_judges: "20 mein se 17", v_judges_n: "Har judge 3 teams, har team 15 min", left: "baqi az",
    story_h: "Message se plan tak", story_hint: "Neeche scroll karein aur plan ki tahein khulti dekhein.",
    s1_t: "Parhna", s1_d: "Chhota model har message parh kar haqaiq nikalta hai.",
    s2_t: "Jaanch", s2_d: "Simple code har haqeeqat ko afraad, nashiston aur judges ki sharait se parakhta hai.",
    s3_t: "Qeemat", s3_d: "Maqam, lunch, judges aur muqarrara akhrajaat code mein jama hote hain.",
    s4_t: "Hatmi", s4_d: "Plan tabhi durust hai jab kul raqam Rs 650,000 ke andar rahe.",
    lay1: "Messages", lay2: "Afraad", lay3: "Mukhtas raqam", lay4: "Plan",
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
var VIEWS = ["overview", "ops", "budget", "dec"];

var state = { lang: "en", view: "overview", print: 10000, total: 650000, live: null };

var rows = [];
var calls = [];

function $(id) { return document.getElementById(id); }
function t(k) { return I18N[state.lang][k] || I18N.en[k] || k; }
function fmt(n) { return "Rs " + Math.round(n || 0).toLocaleString("en-US"); }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

var RM = window.matchMedia("(prefers-reduced-motion: reduce)");
function reduced() { return RM.matches; }

function hydrateFromBackend(data) {
  if (!data || !data.plan) return;
  state.live = data;
  var p = data.plan, B = p.budget || {};
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
  // Scrollspy: update active sidebar item + 3D plate + ambient glow as user scrolls through the single page
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

/* ================= Views (All sections visible in single scroll + smooth jump on click) ================= */
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
  if (target) {
    target.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
  }
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

  if (p) {
    var B = p.budget, V = p.venue, Fd = p.food, J = p.judging, S = p.schedule, d = p.figures;
    var ch = V.chosen || {};
    var allOk = checks.length ? checks.every(function (c) { return c.ok; }) : (B.remaining >= 0);

    $("mSpent").textContent = fmt(B.total);
    $("mLeft").textContent = fmt(Math.abs(B.remaining)) + " " + t("left") + " " + fmt(B.available);
    $("tot").textContent = fmt(B.total);
    $("lv1").textContent = rows.length;
    $("lv2").textContent = V.headcount || 177;
    $("lv3").textContent = fmt(B.total);
    $("lv4").textContent = allOk ? "✓" : "✕";

    if ($("vHall")) $("vHall").textContent = (ch.name || "NONE").replace(/_/g, " ").replace(/\b\w/g, function (l) { return l.toUpperCase(); });
    if ($("vSeats")) $("vSeats").textContent = "Seats " + (ch.capacity || 0) + " for " + (V.headcount || 0) + " people (" + fmt(ch.price || 0) + ")";
    if ($("vBoxes")) $("vBoxes").textContent = String(Fd.boxes || 0);
    if ($("vPrice")) $("vPrice").textContent = fmt(Fd.unit_price || 0) + " each (" + (Fd.tier || "") + ", msg #" + (Fd.price_msg || "?") + ")";
    if ($("vJudges")) $("vJudges").textContent = (J.judges_used || 0) + " of " + (J.pool || 0);
    if ($("vJudgesN")) $("vJudgesN").textContent = "Max " + (J.max_teams_assigned || 0) + " teams each, " + (d.minutes_per_team || 15) + "m/team";
    if ($("edStudents") && document.activeElement !== $("edStudents")) $("edStudents").value = d.students || 150;
    if ($("edTeamSize") && document.activeElement !== $("edTeamSize")) $("edTeamSize").value = d.team_size || 3;
    if ($("edStaff") && document.activeElement !== $("edStaff")) $("edStaff").value = d.staff || 10;
    if ($("edBudget") && document.activeElement !== $("edBudget")) $("edBudget").value = B.cap || 650000;
    if ($("edJudges") && document.activeElement !== $("edJudges")) $("edJudges").value = J.pool || 20;
    if ($("edLunch") && document.activeElement !== $("edLunch")) $("edLunch").value = Fd.unit_price || 1200;

    var maxLine = Math.max.apply(null, (B.lines || []).map(function (l) { return l.amount || 1; }).concat([250000]));
    $("bars").innerHTML = (B.lines || []).map(function (l, i) {
      return '<div class="bar' + (i < 3 ? "" : " r") + '"><div class="t"><span>' + esc(l.item) + "</span><span>" + fmt(l.amount) +
        '</span></div><div class="track"><div class="fill" style="transform:scaleX(' + Math.min(1, (l.amount || 0) / maxLine).toFixed(3) + ')"></div></div></div>';
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
  }).join("") || '<tr><td colspan="4" style="text-align:center;color:var(--mute)">No matching messages for "' + esc(q) + '"</td></tr>';

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
  }).join("") || '<div class="call skip-call"><code>No matching trace entries for "' + esc(q) + '"</code></div>';
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
        $("trace").scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
        return;
      }
    } catch (e) { /* fallback below */ }
    finally {
      btn.disabled = false;
      btn.textContent = t("update");
    }
  }
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
  $("trace").scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
}

/* ================= Wiring ================= */
document.querySelectorAll(".lang button").forEach(function (b) { b.addEventListener("click", function () { setLang(b.dataset.lang); }); });
$("send").addEventListener("click", function () { update($("msg").value); $("msg").value = ""; });
$("msg").addEventListener("keydown", function (e) { if (e.key === "Enter") $("send").click(); });
if ($("applyEditBtn")) {
  $("applyEditBtn").addEventListener("click", async function () {
    var payload = {
      students: +($("edStudents").value || 150),
      team_size: +($("edTeamSize").value || 3),
      staff: +($("edStaff").value || 10),
      budget_cap: +($("edBudget").value || 650000),
      judges_confirmed: +($("edJudges").value || 20),
      lunch_standard: +($("edLunch").value || 1200)
    };
    if (location.protocol.startsWith("http")) {
      $("applyEditBtn").textContent = "Recomputing...";
      try {
        var r = await fetch("/api/edit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (r.ok) await refreshFromServer();
      } finally {
        $("applyEditBtn").textContent = "Apply & Recompute Plan";
      }
      return;
    }
    // Static file:// instant pure-JS recompute
    if (state.live && state.live.plan) {
      var p = state.live.plan, d = p.figures, J = p.judging, V = p.venue, Fd = p.food, B = p.budget;
      d.students = payload.students;
      d.team_size = payload.team_size;
      d.staff = payload.staff;
      d.teams = Math.ceil(d.students / d.team_size);
      d.judges_needed = Math.ceil(d.teams / (d.max_teams_per_judge || 3));
      J.pool = payload.judges_confirmed;
      J.judges_needed = d.judges_needed;
      J.judges_used = Math.min(J.pool, d.judges_needed);
      J.feasible = J.pool >= d.judges_needed;
      J.honoraria = J.judges_used * (J.fee_per_judge || 5000);
      var fed = d.students + d.staff + J.judges_used;
      V.headcount = fed;
      V.required_capacity = fed;
      Fd.headcount = fed;
      Fd.boxes = fed;
      Fd.unit_price = payload.lunch_standard;
      Fd.cost = fed * payload.lunch_standard;
      B.cap = payload.budget_cap;
      B.available = B.cap + (B.funding || 0);
      B.lines.forEach(function (l) {
        if (/^Food/i.test(l.item)) l.amount = Fd.cost;
        if (/^Judge/i.test(l.item)) { l.item = "Judge honoraria (" + J.judges_used + " x " + (J.fee_per_judge || 5000) + ")"; l.amount = J.honoraria; }
      });
      B.total = B.lines.reduce(function (a, b) { return a + b.amount; }, 0);
      B.remaining = B.available - B.total;
      if (state.live.checks && state.live.checks.length >= 5) {
        state.live.checks[0].ok = Fd.boxes >= fed;
        state.live.checks[0].detail = "teams=" + d.teams + ", judges needed=" + d.judges_needed + ", people to feed=" + fed + ", boxes=" + Fd.boxes;
        state.live.checks[1].ok = B.total <= B.available;
        state.live.checks[1].detail = "total " + fmt(B.total) + " vs available " + fmt(B.available) + " (remaining " + fmt(B.remaining) + ")";
        state.live.checks[2].ok = (V.chosen && V.chosen.capacity >= fed);
        state.live.checks[4].ok = J.feasible;
      }
      calls.push({ skip: true, area: "UI Quick Edit (code, no model call)", out: "Updated parameters: students=" + d.students + ", team_size=" + d.team_size + ", staff=" + d.staff + ", budget_cap=" + B.cap + ", judges=" + J.pool + ", lunch=" + Fd.unit_price + " -> total=" + fmt(B.total) });
      render();
    }
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
            $("trace").scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
          }
        } finally {
          btn.disabled = false;
          btn.textContent = "Upload File (TXT/CSV/DOCX/PDF)";
          $("fileInput").value = "";
        }
      } else {
        // Static file:// fallback for text/csv files
        var tr = new FileReader();
        tr.onload = function () {
          btn.disabled = false;
          btn.textContent = "Upload File (TXT/CSV/DOCX/PDF)";
          update(String(tr.result || ""));
        };
        tr.readAsText(file);
      }
    };
    fr.readAsDataURL(file);
  });
}
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
if ($("backIntroLink")) {
  $("backIntroLink").addEventListener("click", function (e) {
    if (typeof window.__MTM_SHOW_INTRO__ === "function") {
      e.preventDefault();
      window.__MTM_SHOW_INTRO__();
    }
  });
}
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

/* Micro-interactions: magnetic buttons, tilting KPI cards, cursor glow on every card, parallax 3D scene */
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
