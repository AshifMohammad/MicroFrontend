/* eslint-disable no-use-before-define */
/* globals document */
const $app = document.getElementById("app");

// data
const flexMFEs = {
  name: "Flex Module",
  variants: [
    {
      suggestedModule: "Vehicle",
      color: "red",
      name: "Vehicle",
      image: "./team-consumer-sales/images/dealpage.jpg",
      thumb: "./team-consumer-sales/images/dealTabIcon.jpg",
      price: "66,00 USD"
    },
    {
      suggestedModule: "Customer",
      color: "green",
      name: "Vehicle",
      image: "./team-consumer-sales/images/VehiclePage.jpg",
      thumb: "./team-consumer-sales/images/VehicleTabIcon.jpg",
      price: "54,00 USD"
    },
    {
      suggestedModule: "Services",
      color: "blue",
      name: "Trade",
      image: "./team-consumer-sales/images/tradeTab.jpg",
      thumb: "./team-consumer-sales/images/TradeTabicon.jpg",
      price: "58,00 USD"
    },

  ]
};

const state = {
  variant: "Vehicle"
};

function renderOption(variant) {
  const active = state.variant === variant.suggestedModule ? "active" : "";
  return `
    <button class="${active}" type="button" data-sku="${variant.suggestedModule}">
      <img src="${variant.thumb}" alt="${variant.name}" />
<!--        <label>${variant.thumb}</label>-->
      <lable></lable>
    </button>
  `;
}

function renderPage() {
  const variant = flexMFEs.variants.find(v => state.variant === v.suggestedModule);
  $app.innerHTML = `
    <h1 id="store">DriveFlex Sales</h1>
  
    <common-core-blue-basket id="basket"></common-core-blue-basket>
    <div id="image"><div><img src="${variant.image}" alt="${
    variant.name
  }" /></div></div>
    <h2 id="name">${flexMFEs.name} <small>${variant.name}</small></h2>
    <div id="options">${flexMFEs.variants.map(renderOption).join("")}</div>
    <common-core-blue-buy id="buy" suggestedModule="${variant.suggestedModule}"></common-core-blue-buy>
    <sales-team-green-recommendation id="reco" suggestedModule="${
      variant.suggestedModule
    }"></sales-team-green-recommendation>
     <h3 id="author">Isn't it funny app?  tell me about it - Slack :  @AshifZafar</h3>
  `;
}

function rerender() {
  removeListeners();
  renderPage();
  addListeners();
}

function handleClickOption(e) {
  const sku = e.currentTarget.getAttribute("data-sku");
  state.variant = sku;
  rerender();
}

function addListeners() {
  const $btns = document.querySelectorAll("#options button");
  Array.prototype.forEach.call($btns, $btn =>
    $btn.addEventListener("click", handleClickOption)
  );
}

function removeListeners() {
  const $btns = document.querySelectorAll("#options button");
  Array.prototype.forEach.call($btns, $btn =>
    $btn.removeEventListener("click", handleClickOption)
  );
}

renderPage();
// on change/ click detection
addListeners();
