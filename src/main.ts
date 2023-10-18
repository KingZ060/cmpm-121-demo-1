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

const button = document.createElement("button");
button.innerHTML = "👛";
button.style.fontSize = "50px";
app.append(button);
