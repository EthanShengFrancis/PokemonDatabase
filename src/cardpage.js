import { Card } from "./Card.js";
import cardsData from "pokemon-tcg-pocket-database/dist/cards.extra.json";

const id = new URLSearchParams(window.location.search).get("id");
const data = cardsData.find(c => `${c.set}-${c.number}` === id);
const container = document.querySelector("#detail");

if (data) {
  const card = new Card(data);
  container.innerHTML = `
    <img src="${card.imgUrl}" alt="${card.name}" width="300">
    <h1>${card.name}</h1>
    <p>${card.element ?? ""} — HP ${card.health ?? "—"}</p>
  `;
}