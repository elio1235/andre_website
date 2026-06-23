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
    price: "150,000",
    tag: "El Classic",
    desc: "El asleyye. 7elwe, na3me w mdakhkhne — el bowl yalli 3ammar el maHal.",
    aura: "rgba(199,90,90,.5)"
  },
  {
    emoji: "🍋",
    name: "Lemon & Mint",
    ar: "ليمون و نعنع",
    price: "150,000",
    tag: "BteHye",
    desc: "Laymoun He2 ma3 ne3na3 mn 3ena. Bared 3a el sader w byefta7 el nafas.",
    aura: "rgba(224,200,90,.55)"
  },
  {
    emoji: "🍇",
    name: "Grapes",
    ar: "عنب",
    price: "150,000",
    tag: "Mazboot",
    desc: "3enab Tabi3e, na3em w 7elo bil 2ad. Nakha mdawwame Tool el sahra.",
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
