import "./style.css";

const PAGES = [
  { label: "Card Database", href: "/index.html" },
  { label: "Card Details", href: "/card.html" }
  // { label: "Stats Dashboard", href: "/stats.html" },
];

export function initNav() {
  const menuButton = document.querySelector("#menu-toggle");
  const navPanel = document.querySelector("#navPanel");
  const backdrop = document.querySelector("#navBackdrop");

  // Guard clause: if a page is missing one of these elements, bail out
  // quietly instead of crashing the whole script on a null.addEventListener
  if (!menuButton || !navPanel || !backdrop) return;

  navPanel.innerHTML = PAGES
    .map(page => `<a href="${page.href}" class="nav-link">${page.label}</a>`)
    .join("");

  function openNav() {
    navPanel.classList.add("open");
    backdrop.classList.remove("hidden");
  }
  function closeNav() {
    navPanel.classList.remove("open");
    backdrop.classList.add("hidden");
  }

  menuButton.addEventListener("click", () => {
    navPanel.classList.contains("open") ? closeNav() : openNav();
  });

  backdrop.addEventListener("click", closeNav);
}