document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      toggle.textContent = open ? "✕" : "☰";
    });
  }
  // Soft pointer parallax for decorative hero stationery.
  const hero = document.querySelector(".hero");
  if (hero && window.matchMedia("(pointer:fine)").matches) {
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.querySelectorAll(".floating-object").forEach((item, i) => {
        item.style.translate = `${x * (i + 1) * 5}px ${y * (i + 1) * 4}px`;
      });
    });
    hero.addEventListener("pointerleave", () => {
      hero.querySelectorAll(".floating-object").forEach(item => item.style.translate = "");
    });
  }
});
