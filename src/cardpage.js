import "./style.css";
import { CardData } from "./CardData.js";
import cardsData from "pokemon-tcg-pocket-database/dist/cards.extra.json";
import { initNav } from "./nav.js";

initNav();

const id = new URLSearchParams(window.location.search).get("id");
const data = cardsData.find(c => `${c.set}-${c.number}` === id);
const container = document.querySelector("#detail");

//==========
// Get the document DOM
const menuContainer = document.querySelector("#backToMenu");

// Create a <button> element.
const backButton = document.createElement("button");

// Give the div the CSS class "toggle" (FOR CSS)
backButton.className = "back-toggle";
backButton.textContent = "Back";

// HTML button with EventListener
backButton.addEventListener("click", () => {window.location.href = "/index.html";
});

// Add back the backButton to the container (QuerySelector)
menuContainer.appendChild(backButton);

//========================

function displayFirstLetterUpper(label, value) {
  if (label == "Rarity"){
  return value.toUpperCase();
  } else {
  return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

if (data) {
  const card = new CardData(data);

  const stats = [
    { label: "Rarity", value: card.rarity },
    { label: "Element", value: card.element },
    { label: "Type", value: card.type },
    { label: "Stage", value: card.stage },
    { label: "HP", value: card.health },
    { label: "Retreat Cost", value: card.retreatCost },
    { label: "Weakness", value: card.weakness },
  ];

  const statsHTML = stats
    .filter(stat => stat.value !== undefined && stat.value !== null && stat.value !== "")
    .map(stat => `<div class="stat-label">${stat.label}</div>
      <div class="stat-value">${displayFirstLetterUpper(stat.label, String(stat.value))}</div>`)
    .join("");

  container.innerHTML = `
    <div class="card-detail">
      <img src="${card.imgUrl}" alt="${card.name}" class="detail-img">
      <div class="detail-info">
        <h1>${card.name}</h1>
        <p class="detail-subtitle">${card.set} · #${card.number}</p>
        <div class="stats-grid">${statsHTML}</div>
      </div>
    </div>
  `;
} else {
  container.innerHTML = `<p>Card not found.</p>`;
}