/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */
(function fragments() {
  const prices = {
    Vehicle: '66,00 €',
    Customer: '54,00 €',
    Services: '58,00 €',
  };

  const state = {
    count: 0,
  };

  class CommonCoreBlueBasket extends HTMLElement {
    connectedCallback() {
      this.refresh = this.refresh.bind(this);
      this.log('connected');
      this.render();
      window.addEventListener('blue:basket:changed', this.refresh);
    }

    refresh() {
      this.log('event recieved "blue:basket:changed"');
      this.render();
    }

    render() {
      const classname = state.count === 0 ? 'empty' : 'filled';
      this.innerHTML = `
        <div class="${classname}">basket: ${state.count} item(s)</div>
      `;
    }

    disconnectedCallback() {
      window.removeEventListener('blue:basket:changed', this.refresh);
      this.log('disconnected');
    }

    log(...args) {
      console.log('🛒 common-core-blue-basket', ...args);
    }
  }
  window.customElements.define('common-core-blue-basket', CommonCoreBlueBasket);


  class CommonCoreBuy extends HTMLElement {
    static get observedAttributes() {
      return ['suggestedModule'];
    }

    connectedCallback() {
      this.addToCart = this.addToCart.bind(this);
      const suggestedModule = this.getAttribute('suggestedModule');
      this.log('connected', suggestedModule);
      this.render();
      this.firstChild.addEventListener('click', this.addToCart);
    }

    addToCart() {
      state.count += 1;
      this.log('event sent "blue:basket:changed"');
      this.dispatchEvent(new CustomEvent('blue:basket:changed', {
        bubbles: true,
      }));
    }

    render() {
      const suggestedModule = this.getAttribute('suggestedModule');
      const price = prices[suggestedModule];
      this.innerHTML = `<button type="button">Create a Deal at ${price}</button>`;
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      this.log('attributeChanged', attr, oldValue, newValue);
      this.render();
    }

    disconnectedCallback() {
      this.firstChild.removeEventListener('click', this.addToCart);
      const suggestedModule = this.getAttribute('suggestedModule');
      this.log('disconnected', suggestedModule);
    }

    log(...args) {
      console.log('🔘 common-core-blue-buy', ...args);
    }
  }
  window.customElements.define('common-core-blue-buy', CommonCoreBuy);
}());
