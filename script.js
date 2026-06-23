/* ============================================================
   Chez André — Argile & Café · Zahlé
   Static info site. No backend, no forms.
   ============================================================ */

/* ---------- FLAVORS (static) ---------- */
const FLAVORS = [
  {
    emoji: "🍎",
    name: "Double Apple",
    ar: "تفاحتين",
    price: "500,000",
    tag: "The Classic",
    desc: "Sweet, smooth and rich — the one everyone orders.",
    aura: "rgba(199,90,90,.5)"
  },
  {
    emoji: "🍋",
    name: "Lemon & Mint",
    ar: "ليمون و نعنع",
    price: "500,000",
    tag: "Fresh",
    desc: "Zesty lemon with cool mint. Light and refreshing.",
    aura: "rgba(224,200,90,.55)"
  },
  {
    emoji: "🍇",
    name: "Grapes",
    ar: "عنب",
    price: "500,000",
    tag: "Smooth",
    desc: "Natural grape, soft and just sweet enough.",
    aura: "rgba(150,110,200,.5)"
  }
];

/* ---------- RENDER CARDS ---------- */
const cardsEl = document.getElementById("cards");
FLAVORS.forEach((f) => {
  const card = document.createElement("article");
  card.className = "card";
  card.style.setProperty("--aura", f.aura);
  card.innerHTML = `
    <div class="thumb">${f.emoji}</div>
    <div class="c-body">
      <div class="c-top">
        <div>
          <div class="c-name">${f.name}</div>
          <div class="c-ar" dir="rtl">${f.ar}</div>
        </div>
        <div class="c-price">${f.price} L.L</div>
      </div>
      <span class="c-tag">${f.tag}</span>
      <p class="c-desc">${f.desc}</p>
    </div>`;
  cardsEl.appendChild(card);
});

/* ---------- SCROLL REVEAL ---------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.16 }
);

function observeReveals() {
  document.querySelectorAll(".card, .feature, .info").forEach((el) => {
    if (!el.classList.contains("in")) io.observe(el);
  });
}
observeReveals();

/* ---------- PAGE NAVIGATION ---------- */
const pages = document.querySelectorAll(".page");
const navBtns = document.querySelectorAll(".nav-btn");

function goTo(id) {
  pages.forEach((p) => p.classList.toggle("active", p.id === id));
  navBtns.forEach((b) => b.classList.toggle("active", b.dataset.page === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
  // re-run reveals for the freshly shown page
  setTimeout(observeReveals, 80);
}

navBtns.forEach((b) => b.addEventListener("click", () => goTo(b.dataset.page)));

// in-page buttons (e.g. "Wein 3enna?")
document.querySelectorAll("[data-go]").forEach((el) =>
  el.addEventListener("click", () => goTo(el.dataset.go))
);
