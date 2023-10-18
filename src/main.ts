import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Star Studio";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = `
  <div class="card"> 
    <span>${gameName}</span>
    <div>-Piggy Bank</div>
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
  countText.innerHTML = `Money saved so far: ${counter.toFixed(2)} 🪙`;
  updatePurchaseButtonState();
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
  availableItems.forEach((item, index) => {
    const currentPrice = countCurrentPrice(item.count, item.initPrice);
    purchaseButtons[index].disabled = counter < currentPrice;
  });
}
const rateTxt = document.createElement("h2");
rateTxt.innerHTML = `Growth rate: ${growthRate.toFixed(2)} 🪙/sec`;
app.append(rateTxt);

// let button1Count: number = 0;
// const purchaseButton = document.createElement("button");
// purchaseButton.innerHTML = `Upgrade item<br>Item bought: ${button1Count}<br>Cost 10 units, gain 0.1 growth rate`;
// purchaseButton.disabled = true;
// function updatePurchaseButton() {
//   if (counter >= 10) {
//     counter -= 10;
//     growthRate += 0.1;
//     button1Count += 1;
//     rateTxt.innerHTML = `Growth rate: ${growthRate.toFixed(2)} 🪙/sec`;
//     purchaseButton.innerHTML = `Upgrade item<br>Item bought: ${button1Count}<br>Cost 10 units, gain 0.1 growth rate`;
//   }
// }
// app.append(purchaseButton);
// purchaseButton.addEventListener("click", updatePurchaseButton);

//Step 6
// let button2Count: number = 0;
// const purchaseButton2 = document.createElement("button");
// purchaseButton2.innerHTML = `Upgrade item<br>Item bought: ${button2Count}<br>Cost 100 units, gain 2 growth rate`;
// purchaseButton2.disabled = true;
// function updatePurchaseButton2() {
//   if (counter >= 100) {
//     counter -= 100;
//     growthRate += 2;
//     button2Count += 1;
//     rateTxt.innerHTML = `Growth rate: ${growthRate.toFixed(2)} 🪙/sec`;
//     purchaseButton2.innerHTML = `Upgrade item<br>Item bought: ${button2Count}<br>Cost 100 units, gain 2 growth rate`;
//   }
// }
// app.append(purchaseButton2);
// purchaseButton2.addEventListener("click", updatePurchaseButton2);

// let button3Count: number = 0;
// const purchaseButton3 = document.createElement("button");
// purchaseButton3.innerHTML = `Upgrade item<br>Item bought: ${button3Count}<br>Cost 1000 units, gain 50 growth rate`;
// purchaseButton3.disabled = true;
// function updatePurchaseButton3() {
//   if (counter >= 1000) {
//     counter -= 1000;
//     growthRate += 50;
//     button3Count += 1;
//     rateTxt.innerHTML = `Growth rate: ${growthRate.toFixed(2)} 🪙/sec`;
//     purchaseButton3.innerHTML = `Upgrade item<br>Item bought: ${button3Count}<br>Cost 1000 units, gain 50 growth rate`;
//   }
// }
// app.append(purchaseButton3);
// purchaseButton3.addEventListener("click", updatePurchaseButton3);

//Step 7
function countCurrentPrice(count: number, price: number): number {
  return price * Math.pow(1.15, count);
}

//Step 9
interface Item {
  name: string;
  img: string;
  description: string;
  initPrice: number;
  rate: number;
  count: number;
}

const availableItems: Item[] = [
  {
    name: "Open a bank Account",
    img: "🏦",
    description: "You have saved some money, let's get some interest!",
    initPrice: 10,
    rate: 0.1,
    count: 0,
  },
  {
    name: "Upgrade to a Gold Account",
    img: "⭐",
    description: "A higher level account for more interest!",
    initPrice: 100,
    rate: 5,
    count: 0,
  },
  {
    name: "Find an investment manager to manage your money",
    img: "🏛️",
    description: "Bank interest can no longer satisfy you, let’s invest!",
    initPrice: 1000,
    rate: 100,
    count: 0,
  },
  {
    name: "Open a public company",
    img: "🏢",
    description:
      "You get enough money and you turn your attention to starting a company.",
    initPrice: 10000,
    rate: 1500,
    count: 0,
  },
  {
    name: "The position of the world's richest man",
    img: "🤑🤑🤑",
    description:
      "Your money makes you the richest man in the world, and you don't have to do anything anymore.",
    initPrice: 10000000,
    rate: 99999999,
    count: 0,
  },
];

const purchaseButtons: HTMLButtonElement[] = [];
availableItems.forEach((item) => {
  const purchaseButton = document.createElement("button");
  function updateButton() {
    const currentPrice = countCurrentPrice(item.count, item.initPrice);
    rateTxt.innerHTML = `Growth rate: ${growthRate.toFixed(2)} 🪙/sec`;
    purchaseButton.innerHTML = `
      ${item.name}
      <br>Account opened: ${item.count}, Cost: ${currentPrice.toFixed(
        2,
      )}🪙, Gain: ${item.rate}🪙/sec
      <br>${item.description}
    `;
  }
  purchaseButtons.push(purchaseButton);
  purchaseButton.addEventListener("click", () => {
    const currentPrice = countCurrentPrice(item.count, item.initPrice);
    if (counter >= currentPrice) {
      counter -= currentPrice;
      growthRate += item.rate;
      item.count += 1;
      updateButton();
      updatePurchaseButtonState();
    }
  });
  app.append(purchaseButton);
  updateButton();
});

// const item1Price = 10;
// let button1Count: number = 0;
// const purchaseButton = document.createElement("button");
// purchaseButton.innerHTML = `Open a bank Account<br>Account opened: ${button1Count}, Cost: ${item1Price}🪙, Gain: 0.1🪙/sec<br>You have saved some money, let's get some interest!`;
// purchaseButton.disabled = true;
// function updatePurchaseButton() {
//   let currentPrice = countCurrentPrice(button1Count, item1Price);
//   if (counter >= currentPrice) {
//     counter -= currentPrice;
//     growthRate += 0.1;
//     button1Count += 1;
//     rateTxt.innerHTML = `Growth rate: ${growthRate.toFixed(2)} 🪙/sec`;
//   }
//   currentPrice = countCurrentPrice(button1Count, item1Price);
//   purchaseButton.innerHTML = `Open a bank Account<br>Account opened: ${button1Count}, Cost: ${currentPrice.toFixed(
//     2,
//   )}🪙, Gain: 0.1🪙/sec<br>You have saved some money, let's get some interest!`;
// }
// app.append(purchaseButton);
// purchaseButton.addEventListener("click", updatePurchaseButton);

// const item2Price = 100;
// let button2Count: number = 0;
// const purchaseButton2 = document.createElement("button");
// purchaseButton2.innerHTML = `Upgrade to a "Gold Account"<br>Account opened: ${button2Count}, Cost: ${item2Price}🪙, Gain: 5🪙/sec<br>A higher level account for more interest!`;
// purchaseButton2.disabled = true;
// function updatePurchaseButton2() {
//   let currentPrice = countCurrentPrice(button2Count, item2Price);
//   if (counter >= currentPrice) {
//     counter -= currentPrice;
//     growthRate += 5;
//     button2Count += 1;
//     rateTxt.innerHTML = `Growth rate: ${growthRate.toFixed(2)} 🪙/sec`;
//   }
//   currentPrice = countCurrentPrice(button2Count, item2Price);
//   purchaseButton2.innerHTML = `Upgrade to a "Gold Account"<br>Account opened: ${button2Count}, Cost: ${currentPrice.toFixed(
//     2,
//   )}🪙, Gain: 5🪙/sec<br>A higher level account for more interest!`;
// }
// app.append(purchaseButton2);
// purchaseButton2.addEventListener("click", updatePurchaseButton2);

// const item3Price = 1000;
// let button3Count: number = 0;
// const purchaseButton3 = document.createElement("button");
// purchaseButton3.innerHTML = `Find an investment manager to manage your money<br>Account opened: ${button3Count}, Cost: ${item3Price}🪙, Gain: 100🪙/sec<br>Bank interest can no longer satisfy you, let’s invest!`;
// purchaseButton3.disabled = true;
// function updatePurchaseButton3() {
//   let currentPrice = countCurrentPrice(button3Count, item3Price);
//   if (counter >= currentPrice) {
//     counter -= currentPrice;
//     growthRate += 100;
//     button3Count += 1;
//     rateTxt.innerHTML = `Growth rate: ${growthRate.toFixed(2)} 🪙/sec`;
//   }
//   currentPrice = countCurrentPrice(button3Count, item3Price);
//   purchaseButton3.innerHTML = `Find an investment manager to manage your money<br>Account opened: ${button3Count}, Cost: ${currentPrice.toFixed(
//     2,
//   )}🪙, Gain: 100🪙/sec<br>Bank interest can no longer satisfy you, let’s invest!`;
// }
// app.append(purchaseButton3);
// purchaseButton3.addEventListener("click", updatePurchaseButton3);
