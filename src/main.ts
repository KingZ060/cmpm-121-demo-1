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
let counter: number = 999;
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
function updatePurchaseButtonState() {
  purchaseButton.disabled = counter < 10;
  purchaseButton2.disabled = counter < 100;
  purchaseButton3.disabled = counter < 1000;
}
const rateTxt = document.createElement("h2");
rateTxt.innerHTML = `Growth rate: ${growthRate.toFixed(2)} 🪙/sec`;
app.append(rateTxt);

let button1Count: number = 0;
const purchaseButton = document.createElement("button");
purchaseButton.innerHTML = `Upgrade item<br>Item bought: ${button1Count}<br>Cost 10 units, gain 0.1 growth rate`;
purchaseButton.disabled = true;
function updatePurchaseButton() {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 0.1;
    button1Count += 1;
    rateTxt.innerHTML = `Growth rate: ${growthRate.toFixed(2)} 🪙/sec`;
    purchaseButton.innerHTML = `Upgrade item<br>Item bought: ${button1Count}<br>Cost 10 units, gain 0.1 growth rate`;
  }
}
app.append(purchaseButton);
purchaseButton.addEventListener("click", updatePurchaseButton);

//Step 6
let button2Count: number = 0;
const purchaseButton2 = document.createElement("button");
purchaseButton2.innerHTML = `Upgrade item<br>Item bought: ${button2Count}<br>Cost 100 units, gain 2 growth rate`;
purchaseButton2.disabled = true;
function updatePurchaseButton2() {
  if (counter >= 100) {
    counter -= 100;
    growthRate += 2;
    button2Count += 1;
    rateTxt.innerHTML = `Growth rate: ${growthRate.toFixed(2)} 🪙/sec`;
    purchaseButton2.innerHTML = `Upgrade item<br>Item bought: ${button2Count}<br>Cost 100 units, gain 2 growth rate`;
  }
}
app.append(purchaseButton2);
purchaseButton2.addEventListener("click", updatePurchaseButton2);

let button3Count: number = 0;
const purchaseButton3 = document.createElement("button");
purchaseButton3.innerHTML = `Upgrade item<br>Item bought: ${button3Count}<br>Cost 1000 units, gain 50 growth rate`;
purchaseButton3.disabled = true;
function updatePurchaseButton3() {
  if (counter >= 1000) {
    counter -= 1000;
    growthRate += 50;
    button3Count += 1;
    rateTxt.innerHTML = `Growth rate: ${growthRate.toFixed(2)} 🪙/sec`;
    purchaseButton3.innerHTML = `Upgrade item<br>Item bought: ${button3Count}<br>Cost 1000 units, gain 50 growth rate`;
  }
}
app.append(purchaseButton3);
purchaseButton3.addEventListener("click", updatePurchaseButton3);
