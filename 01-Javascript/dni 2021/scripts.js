(function () {
  "use strict";
  const lletres = "TRWAGMYFPDXBNJZSQVHLCKET".split("");
  const arrayDNIs = ["124312", "12345678", "sadf21123", "11111111", "22222222"];

  class DNI {
    constructor(dni) {
      this.dni = "";
      this.lletra = "";
      if (DNI.validar(dni)) {
        this.dni = dni;
        this.lletra = DNI.calcularLletra(dni);
      }
    }
    static validar(dni) {
      if (!isNaN(dni) && dni.length == 8) {
        return true;
      } else {
        return false;
      }
    }
    static calcularLletra(dni) {
      return lletres[parseInt(dni) % 23];
    }
    dniComplet() {
      return `${this.dni}${this.lletra}`;
    }
  }

  let arrayObjectesDNI = [];

  for (let d of arrayDNIs) {
    arrayObjectesDNI.push(new DNI(d));
  }

  console.log(arrayObjectesDNI);

  /*
  function lletra(dni) {
   
    return lletres[parseInt(dni) % 23];
  }

  function calcularLletra() {
    //console.log(document.querySelector("#dni").value);
    let dni = this.value;
    console.log(dni);
    if (validar(dni)) {
      console.log(lletra(dni));
    } else {
      console.log("El DNI no és vàlid");
    }
  }

  function calcularDNIs() {
    let lletraUsuari = document.querySelector("#lletra").value;
    let posicio = lletres.indexOf(lletraUsuari);
    console.log("Calculant DNI de la lletra: ", lletraUsuari, posicio);
    let llistaDNIs = [];
    for (let i = 0; i < 20; i++) {
      let dni = Math.floor(Math.random() * 4347825) * 23 + posicio;
      llistaDNIs.push(dni + lletra(dni));
    }
    console.log(llistaDNIs);
  }

  for (let d of arrayDNIs) {
    if (validar(d)) {
      console.log(`DNI: ${d}${lletra(d)}`);
    } else {
      console.log("El DNI no és vàlid");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#dni").addEventListener("click", calcularLletra);
    document
      .querySelector("#calcularDNIs")
      .addEventListener("click", calcularDNIs);
  });*/
})();

function UiComponent() {
  this.name = "UiComponent";
  //var _this = this;
  var button = document.querySelector("#header");
  button.UiComponent = this;
  button.addEventListener("click", function () {
    console.log("CLICK", this);
    this.UiComponent.handleClick();
    //this.handleClick();
  });
}
UiComponent.prototype.handleClick = function () {
  console.log(this);
};

//let ui = new UiComponent();
