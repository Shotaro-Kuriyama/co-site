/* ==========================================================
   C&O: tiny JS for progressive enhancement
   - Mobile menu
   - Theme toggle (localStorage)
   - Reveal on scroll (IntersectionObserver)
   - Contact form via Formspree (optional)
   ========================================================== */

(function(){
  const root = document.documentElement;

  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Theme (auto -> saved)
  const THEME_KEY = "co_theme";
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);

  const themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn){
    themeBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.getElementById("nav-panel");

  if (toggle && panel){
    toggle.addEventListener("click", () => {
      const open = panel.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // close on link click
    panel.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        panel.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // close on outside click
    document.addEventListener("click", (e) => {
      if (!panel.classList.contains("open")) return;
      const t = e.target;
      if (panel.contains(t) || toggle.contains(t)) return;
      panel.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  // Reveal animations
  const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = document.querySelectorAll(".reveal");
  if (!prefersReduce && "IntersectionObserver" in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add("is-visible"));
  }

  // Elevate header on scroll
  const header = document.querySelector("[data-elevate]");
  if (header){
    const onScroll = () => {
      if (window.scrollY > 6) header.classList.add("elevated");
      else header.classList.remove("elevated");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Formspree integration (replace URL)
  // 1) Create a Formspree form (free plan works for small sites)
  // 2) Replace FORM_ENDPOINT with your endpoint URL
  const FORM_ENDPOINT = "https://formspree.io/f/mojavdog"; // Optional: set Formspree endpoint URL
  const RECIPIENT_EMAIL = "akasabu36@gmail.com";
const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");
  if (form){
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!FORM_ENDPOINT){
        // Fallback: open mail app with a prefilled email (works on GitHub Pages without any backend)
        const name = (fd.get("name") || "").toString();
        const contact = (fd.get("contact") || "").toString();
        const message = (fd.get("message") || "").toString();

        const subject = encodeURIComponent("【C&O】お問い合わせ");
        const body = encodeURIComponent(
          `お名前：${name}
ご連絡先：${contact}

---
${message}
---

（このメールはWebフォームから作成されました）`
        );

        const mailto = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
        window.location.href = mailto;

        if (note) note.textContent = "メールアプリが開きます。送信を完了してください。";
        return;
      }

      const fd = new FormData(form);
      if (note) note.textContent = "送信中…";

      try{
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          body: fd,
          headers: { "Accept": "application/json" }
        });

        if (res.ok){
          form.reset();
          if (note) note.textContent = "送信しました。折り返しご連絡します。";
        } else {
          if (note) note.textContent = "送信に失敗しました。時間を置いて再度お試しください。";
        }
      } catch(err){
        if (note) note.textContent = "通信エラーが発生しました。お電話でご連絡ください。";
      }
    });
  }
})();
