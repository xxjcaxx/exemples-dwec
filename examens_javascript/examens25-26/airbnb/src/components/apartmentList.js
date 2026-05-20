import { getApartments } from "../services/air-service";

class ApartmentList extends HTMLElement {


  connectedCallback() {
    console.log("Custom element added to page.");
    this.innerHTML = `loading`
    getApartments('',1)
  }


}

customElements.define("air-apartmentlist", ApartmentList);