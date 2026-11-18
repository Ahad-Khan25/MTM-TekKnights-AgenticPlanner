(() => {
  // Set this to your friend's homepage URL (e.g. "/", "http://localhost:5000", or "out/report.html")
  const HOMEPAGE_URL = "dashboard.html";

  const introSteps = Array.from(document.querySelectorAll(".intro-step"));
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  const vortexStage = document.getElementById("vortexStage");
  const animatedBudgetEl = document.getElementById("animatedBudget");
  const introHud = document.getElementById("introHud");
  const introProgressFill = document.getElementById("introProgressFill");
  const skipIntroBtn = document.getElementById("skipIntroBtn");
  const replayIntroBtn = document.getElementById("replayIntroBtn");
  const planNowBtn = document.getElementById("planNowBtn");
  const ctaFinale = document.getElementById("cta-finale");

  let autoScrollRaf = null;
  let scrollTimer = null;
  let isAutoScrolling = false;
  let budgetAnimated = false;

  function animateNumber(el, target, duration = 1000, prefix = "") {
    const start = performance.now();
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${prefix}${Math.round(target * eased).toLocaleString()}`;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Reveal sections as they enter the viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        if (!budgetAnimated && entry.target.contains(animatedBudgetEl)) {
          budgetAnimated = true;
          animateNumber(animatedBudgetEl, 547400, 750, "Rs ");
        }
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));

  function stopAutoScroll(markDone = true) {
    isAutoScrolling = false;
    if (autoScrollRaf) cancelAnimationFrame(autoScrollRaf);
    if (scrollTimer) clearTimeout(scrollTimer);
    if (markDone) {
      introProgressFill.style.width = "100%";
      introHud.classList.add("is-done");
    }
  }

  function startFullPageScroll(durationMs = 8200) {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) {
      stopAutoScroll(true);
      return;
    }

    isAutoScrolling = true;
    const startY = window.scrollY;
    const distance = maxScroll - startY;
    const startTime = performance.now();

    function step(now) {
      if (!isAutoScrolling) return;
      const elapsed = now - startTime;
      const t = Math.min(elapsed / durationMs, 1);
      // Smooth easeInOutSine for cinematic camera pan down the page
      const eased = -(Math.cos(Math.PI * t) - 1) / 2;

      window.scrollTo({ top: startY + distance * eased, behavior: "instant" });
      introProgressFill.style.width = `${Math.round(28 + t * 72)}%`;

      if (t < 1) {
        autoScrollRaf = requestAnimationFrame(step);
      } else {
        stopAutoScroll(true);
      }
    }

    autoScrollRaf = requestAnimationFrame(step);
  }

  function playFullIntro() {
    stopAutoScroll(false);
    budgetAnimated = false;
    window.scrollTo({ top: 0, behavior: "instant" });
    introHud.classList.remove("is-done");
    introProgressFill.style.width = "10%";

    introSteps.forEach((el) => el.classList.remove("is-visible"));
    revealEls.forEach((el) => {
      el.classList.remove("is-visible");
      observer.observe(el);
    });
    vortexStage?.classList.remove("is-animating");
    void document.body.offsetHeight;

    const delays = { 1: 40, 2: 140, 3: 240 };
    introSteps.forEach((el) => {
      const step = Number(el.dataset.step || 1);
      setTimeout(() => el.classList.add("is-visible"), delays[step] ?? 80);
    });

    setTimeout(() => {
      vortexStage?.classList.add("is-animating");
      introProgressFill.style.width = "28%";
    }, 260);

    // Faster, punchier Dribbble-style pace: ~1.85s vortex + 5.2s full-page scroll
    scrollTimer = setTimeout(() => {
      startFullPageScroll(5200);
    }, 1850);
  }

  // Cancel auto-scroll if user manually interacts with wheel or touch
  window.addEventListener("wheel", () => isAutoScrolling && stopAutoScroll(true), { passive: true });
  window.addEventListener("touchstart", () => isAutoScrolling && stopAutoScroll(true), { passive: true });

  skipIntroBtn?.addEventListener("click", () => {
    stopAutoScroll(true);
    revealEls.forEach((el) => el.classList.add("is-visible"));
    ctaFinale?.scrollIntoView({ behavior: "smooth" });
  });

  replayIntroBtn?.addEventListener("click", playFullIntro);

  planNowBtn?.addEventListener("click", () => {
    if (typeof window.__MTM_SHOW_DASHBOARD__ === "function") {
      window.__MTM_SHOW_DASHBOARD__();
    } else {
      window.location.href = HOMEPAGE_URL;
    }
  });

  window.addEventListener("DOMContentLoaded", playFullIntro);
})();
