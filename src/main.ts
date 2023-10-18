import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Star Studio";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = `
  <div class="card"> 
    <span>${gameName}</span>
    <div>-Piggy Bank<div>
  </div>
`;
app.append(header);

//Step 1
const button = document.createElement("button");
button.innerHTML = "👛";
button.style.fontSize = "50px";
app.append(button);

//Step 2
let counter: number = 0;
const countText = document.createElement("h3");
countText.innerHTML = `Money saved so far: ${counter} 🪙`;
app.append(countText);
button.addEventListener("click", () => setCounter(counter + 1));

function setCounter(count: number) {
  counter = count;
  countText.innerHTML = `Money saved so far: ${counter} 🪙`;
}
