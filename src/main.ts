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
const countText = document.createElement("h2");
countText.innerHTML = `Money saved so far: ${counter} 🪙`;
app.append(countText);
button.addEventListener("click", () => setCounter(counter + 1));

function setCounter(count: number) {
  counter = count;
  updatePurchaseButtonState();
  countText.innerHTML = `Money saved so far: ${counter.toFixed(2)} 🪙`;
}

//Step 3
const autoClickTime = 1000;
let nIntervId;
if (!nIntervId) {
  nIntervId = setInterval(() => {
    setCounter(counter + 1);
  }, autoClickTime);
}

//Step 4
clearTimeout(nIntervId);
let lastTimeStamp: number;
let growthRate: number = 0;
function updateCounter(timestamp: number) {
  if (lastTimeStamp != null) {
    const deltaTime = (timestamp - lastTimeStamp) / 1000;
    setCounter(counter + growthRate * deltaTime);
  }
  lastTimeStamp = timestamp;
  requestAnimationFrame(updateCounter);
}
requestAnimationFrame(updateCounter);

//Step 5
const rateTxt = document.createElement("h2");
rateTxt.innerHTML = `Growth rate: ${growthRate.toFixed(2)} 🪙/sec`;
app.append(rateTxt);

const purchaseButton = document.createElement("button");
purchaseButton.innerHTML = `Upgrade item<br>Cost 10 units, gain 1 growth rate`;
purchaseButton.disabled = true;

function updatePurchaseButtonState() {
  purchaseButton.disabled = counter < 10;
}
function updatepurchaseButton() {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    rateTxt.innerHTML = `Growth rate: ${growthRate.toFixed(2)} 🪙/sec`;
  }
}
app.append(purchaseButton);
purchaseButton.addEventListener("click", updatepurchaseButton);
