// src/main.js
import cards from "pokemon-tcg-pocket-database/dist/cards.extra.json";
import sets from "pokemon-tcg-pocket-database/dist/sets.json";
import rarities from "pokemon-tcg-pocket-database/dist/rarities.json";

const container = document.querySelector("#app");

cards.slice(0, 10).forEach(card => {
  const imgUrl = `https://cdn.jsdelivr.net/gh/flibustier/pokemon-tcg-pocket-database/dist/cards-by-set/${card.set}/${card.number}.webp`;
  const el = document.createElement("div");
  el.innerHTML = `
    <img src="${imgUrl}" alt="${card.name}" width="150">
    <p>${card.name} — ${card.element ?? ""} — HP ${card.health ?? "—"}</p>
  `;
  container.appendChild(el);
});


// src/main.js
// const url = "https://cdn.jsdelivr.net/npm/pokemon-tcg-pocket-database/dist/cards.extra.json";

// fetch(url)
//   .then(response => response.json())
//   .then(cards => {
//     console.log(`Loaded ${cards.length} cards`);
//     console.log(cards[0]); // peek at the shape of one card
//   })
//   .catch(error => console.error("Fetch failed:", error));