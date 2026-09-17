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

const CARDS_PER_PAGE = 350;

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
  renderCards(filtered.slice(0, CARDS_PER_PAGE));
})

searchInput.addEventListener("input", () => {
  //Make sure both searchInput and card name is lowercase
  const query = searchInput.value.toLowerCase();
  const filtered = cardJson.filter(card =>

    // includes checks for substrings
    card.name.toLowerCase().includes(query)
  );
  renderCards(filtered.slice(0, CARDS_PER_PAGE));
})


// Menu
menuButton.addEventListener("click", () => {
  sideBar.classList.toggle("hidden");
});


//===================================================================
//Filter isnt working for the stage text and other text

// Get all unique values for a specific property in our card data
// getUniquevalues(cardJson, "rarity" would get Common, Rare, Epic)
function getUniqueValues(data, key) {
// data.map(...) goes through every card in the data.
  //
  // card[key] gets the value from the key."
  //
  // If key = "rarity", then card["rarity"]

  const values = data.map(card => card[key]);

  // Remove empty/falsy values for null and undefined
  const validValues = values.filter(Boolean);

  const lowerCaseValues = validValues.map(value => String(value).toLowerCase());

  // Set automatically removes duplicate values.
  const uniqueValues = new Set(lowerCaseValues);

  // Convert the Set back into an Array.
  //
  // The spread operator (...) takes all the values
  // inside the Set and puts them into a new array.
  const array = [...uniqueValues];

  // Sort the values alphabetically.
  return array.sort();
}

// Function to displayFirstLetterUpper
function displayFirstLetterUpper(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// Take the options as a list and create each key as a selection
function createFilterGroup(title, options, key) {

   // Create a <div> element.
  const group = document.createElement("div");
  // Give the div the CSS class "filter-group".
  // We can use this class in our CSS to style the group.
  group.className = "filter-group";

   // Create a <button> element.
  const toggle = document.createElement("button");
    // Give the div the CSS class "filter-group".
  // We can use this class in our CSS to style the group.
  toggle.className = "filter-group-toggle";
  toggle.textContent = title;

  // EXpanded button
  toggle.addEventListener("click", () => group.classList.toggle("expanded"));

  // Create a <div> to hold all the checkbox options
  const list = document.createElement("div");
  list.className = "filter-group-options";

  // Go through every option for labels in options array
  options.forEach(option => {
    // Create label element with HTML checkbox
    const label = document.createElement("label");

      //Use function to create uppercase
    const displayText = displayFirstLetterUpper(option);

    label.innerHTML = `<input type="checkbox" value="${option}" data-filter="${key}"> ${displayText}`;

    // The list for the DOM wants the label that also creates for the DOM (DOM to DOM)
    list.appendChild(label);
  });

  group.append(toggle, list);
  return group;
}

// Find the HTML element with the id="filters". (Can vbe reused)
//
// For example, if your HTML contains:
// <div id="filters"></div>
// filtersContainer will refer to that <div>.
const filtersContainer = document.querySelector("#filters");
filtersContainer.append(
  createFilterGroup("Rarity", getUniqueValues(cardJson, "rarity"), "rarity"),
  createFilterGroup("Element", getUniqueValues(cardJson, "element"), "element"),
  createFilterGroup("Type", getUniqueValues(cardJson, "type"), "type"),
  createFilterGroup("Stage", getUniqueValues(cardJson, "stage"), "stage")
);

console.log(getUniqueValues(cardJson, "rarity"));
console.log(getUniqueValues(cardJson, "element"));
console.log(getUniqueValues(cardJson, "type"));
console.log(getUniqueValues(cardJson, "stage"));

function applyFilters() {
  const query = searchInput.value.toLowerCase();

  const checked = document.querySelectorAll("#filters input:checked");

  const active = {};

  checked.forEach(box => {
    const key = box.dataset.filter;

    (active[key] ??= []).push(box.value);
  });

  console.log("Active filters:", active);

  const filtered = cardJson.filter(card => {

    const matchesSearch = card.name.toLowerCase().includes(query);

    const matchesFilters = Object.entries(active).every(([key, values]) => {

      console.log("Filter key:", key);
      console.log("Selected values:", values);
      console.log("Card value:", card[key]);
      console.log("Selected value type:", typeof values[0]);
      console.log("Card value type:", typeof card[key]);

      return values.includes(String(card[key]).toLowerCase());
    });

    return matchesSearch && matchesFilters;
  });

  renderCards(filtered.slice(0, CARDS_PER_PAGE));
}

searchInput.addEventListener("input", applyFilters);
filtersContainer.addEventListener("change", applyFilters);

renderCards(cardJson.slice(0, CARDS_PER_PAGE));



