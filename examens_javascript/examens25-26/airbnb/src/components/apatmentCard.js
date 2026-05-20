class ApartmentCard extends HTMLElement {

  connectedCallback() {
    console.log("Custom element added to page.");
    this.innerHTML = `hola`
  }


}

customElements.define("air-apartmentcard", ApartmentCard);