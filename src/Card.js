// Why a class here specifically: every card needs the same shape of data (id, name, image URL) and the same behaviour (how to render itself, what happens when clicked) — a class lets you define that once and stamp out 100 instances of it, instead of repeating the same object-building logic in a loop.

export class Class {
    constructor(data){
        this.id = data.number;
        this.set = data.set;
        this.name = data.name;
        this.rarity = data.rarity;
        this.imgUrl = '\image\cards-by-set\${data.set}\${data.number}.webp';
        this.element = data.element;
        this.type = data.type;
        this.stage = data.stage;
        this.health = data.health;
        this.retreatCost = data.retreatCost;
        this.weakness = data.weakness;
        this.goodWith = data.goodWith;
    }
    render() {
        // Create the div element
        const el = document.createElement("div");
        el.className = "card";
        el.innerHTML = `
        <img src="${this.imgUrl}" alt="${this.name}" width="150">
        <p>${this.name} — ${this.element ?? ""} — HP ${this.health ?? "—"}</p>
        `;

        // Inside the Card class's render() method, attach element.addEventListener("click", ...) to the div you just built. This is your first event listener — a function that waits and only runs when the user actually interacts with that specific element, rather than running immediately like the rest of your code.
        el.addEventListener("click", () => {
        window.location.href = `/card.html?id=${this.id}`;
        });
        return el;
    }
}