// src/main.js
import { CardData } from "./CardData.js";
import sets from "pokemon-tcg-pocket-database/dist/sets.json";
import rarities from "pokemon-tcg-pocket-database/dist/rarities.json";
import cardJson from "pokemon-tcg-pocket-database/dist/cards.extra.json";
import "./style.css";

// This creates a container named app (Entry point into the DOM)

const container = document.querySelector("#app");
const sideBar = document.querySelector("#sideBar");
const menuButton = document.querySelector("#menu-toggle");

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");

// // Inbisbile in memory container you build up first then attach to page in one shot
// const fragment = document.createDocumentFragment();


function renderCards(list) {
  container.innerHTML = ""; 
  const fragment = document.createDocumentFragment();
  list.forEach(data => {
    const card = new CardData(data);
    fragment.appendChild(card.render());
  });
  container.appendChild(fragment);
}


// ===============

searchButton.addEventListener("click", () => {
  //Make sure both searchInput and card name is lowercase
  const query = searchInput.value.toLowerCase();
  const filtered = cardJson.filter(card =>

    // includes checks for substrings
    card.name.toLowerCase().includes(query)
  );
  renderCards(filtered.slice(0, 20));
})

searchInput.addEventListener("input", () => {
  //Make sure both searchInput and card name is lowercase
  const query = searchInput.value.toLowerCase();
  const filtered = cardJson.filter(card =>

    // includes checks for substrings
    card.name.toLowerCase().includes(query)
  );
  renderCards(filtered.slice(0, 20));
})


// Menu
menuButton.addEventListener("click", () => {
  sideBar.classList.toggle("hidden");
});

renderCards(cardJson.slice(0, 20));

// cardJson.slice(0, 30).forEach(data => {
//   const card = new CardData(data);
//   fragment.appendChild(card.render());
// });
// container.appendChild(fragment);






// cards.slice(0, 20).forEach(data => {
//   const card = new CardData(data);
//   container.appendChild(card.render());
// });


