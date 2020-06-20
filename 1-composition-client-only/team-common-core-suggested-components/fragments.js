/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window */
(function fragments() {
  const recos = {
    Vehicle: ["3", "5", "6"],
    Customer: ["3", "6", "4"],
    Services: ["1", "8", "7"]
  };

  class SalesTeamGreenRecommendation extends HTMLElement {
    static get observedAttributes() {
      return ["suggestedModule"];
    }

    connectedCallback() {
      const suggestedModule = this.getAttribute("suggestedModule");
      this.log("connected", suggestedModule);
      this.render();
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      this.log("attributeChanged", attr, newValue);
      this.render();
    }

    render() {
      const suggestedModule = this.getAttribute("suggestedModule");
      const reco = recos[suggestedModule] || [];
      console.log(recos[suggestedModule])
      this.innerHTML = `
        <h3>Recommended Vehicle Component MFE</h3>
        ${reco
          .map(
            id =>
              `<img src="./team-common-core-suggested-components/images/reco_${id}.jpg" alt="Reco ${id}" />`
          )
          .join("")}
      `;
    }

    disconnectedCallback() {
      const suggestedModule = this.getAttribute("suggestedModule");
      this.log("disconnected", suggestedModule);
    }

    log(...args) {
      console.log("🖼️ sales-team-green-recommendation", ...args);
    }
  }
  window.customElements.define(
    "sales-team-green-recommendation",
    SalesTeamGreenRecommendation
  );
})();
