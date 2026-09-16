// import { CardData } from "./CardData.js";
// import cardsData from "pokemon-tcg-pocket-database/dist/cards.extra.json";

// const id = new URLSearchParams(window.location.search).get("id");
// const data = cardsData.find(c => `${c.set}-${c.number}` === id);
// const container = document.querySelector("#detail");

// if (data) {
//   const card = new CardData(data);
//   container.innerHTML = `
//     <img src="${card.imgUrl}" alt="${card.name}" width="300">
//     <h1>${card.name}</h1>
//     <p>${card.element ?? ""} — HP ${card.health ?? "—"}</p>
//   `;
// }

// src/cardpage.js
import { CardData } from "./CardData.js";
import cardsData from "pokemon-tcg-pocket-database/dist/cards.extra.json";

const id = new URLSearchParams(window.location.search).get("id");
const data = cardsData.find(c => `${c.set}-${c.number}` === id);
const container = document.querySelector("#detail");

if (data) {
  const card = new CardData(data);

  const stats = [
    { label: "Set", value: card.set },
    { label: "Number", value: card.number },
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
    .map(stat => `
      <div class="stat-row">
        <span class="stat-label">${stat.label}</span>
        <span class="stat-value">${stat.value}</span>
      </div>
    `)
    .join("");

  container.innerHTML = `
    <div class="card-detail">
      <img src="${card.imgUrl}" alt="${card.name}" class="detail-img">
      <div class="detail-info">
        <h1>${card.name}</h1>
        <div class="stats-grid">${statsHTML}</div>
      </div>
    </div>
  `;
} else {
  container.innerHTML = `<p>Card not found.</p>`;
}