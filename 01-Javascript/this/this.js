//(()=>{
"use strict";

function modificarLlista(elementLlista, funcio, llista) {
  let itemsLlista = Array.from(llista.querySelectorAll("li"));
  let posicio = itemsLlista.indexOf(elementLlista);
  let llistaOrdenada = [...itemsLlista];
  if (funcio == "up" && posicio > 0) {
    llistaOrdenada = [
      ...itemsLlista.slice(0, posicio - 1),
      elementLlista,
      itemsLlista[posicio - 1],
      ...itemsLlista.slice(posicio + 1),
    ];
  }
  if (funcio == "down" && posicio < itemsLlista.length) {
    llistaOrdenada = [
      ...itemsLlista.slice(0, posicio),
      itemsLlista[posicio + 1],
      elementLlista,
      ...itemsLlista.slice(posicio + 2),
    ];
  }
  let frag = document.createDocumentFragment(); // fragment per canviar el contingut i per no fer l'etiqueta ul
  for (let item of llistaOrdenada) {
    frag.append(item);
  }
  llista.innerHTML = "";
  llista.append(frag);
}

function fletxa() {
  // Provar flexa sense el addeventlistener
  let elementLlista = this.parentElement.parentElement;
  let funcio = this.className;
  let llista = elementLlista.parentElement;

  modificarLlista(elementLlista, funcio, llista);
}

function plenarLlista(llista) {
  for (let i = 0; i < 10; i++) {
    let elementLlista = document.createElement("li");
    elementLlista.id = `element_${i}`;
    elementLlista.innerHTML = `${i} <div class="buttons"><button class="up">▲</button><button class="down">▼</button></div>`; // Pensar si és millor així o creant-los
    //let upButton = elementLlista.querySelector('.up');
    //let downButton = elementLlista.querySelector('.down');
    let buttons = elementLlista.querySelectorAll("button");
    buttons.forEach((b) => {
      b.addEventListener("click", fletxa);
    });
    llista.append(elementLlista);
  }
}

function fletxa2(event) {
  let elementLlista = event.target.parentElement.parentElement;
  let funcio = event.target.className;
  let llista = elementLlista.parentElement;

  modificarLlista(elementLlista, funcio, llista);
}

function plenarLlista2(llista) {
  for (let i = 0; i < 10; i++) {
    let elementLlista = document.createElement("li");
    elementLlista.id = `element2_${i}`;
    elementLlista.innerHTML = `${i} <div class="buttons"><button class="up">▲</button><button class="down">▼</button></div>`; // Pensar si és millor així o creant-los
    let buttons = elementLlista.querySelectorAll("button");
    buttons.forEach((b) => {
      b.addEventListener("click", function (event) {
        fletxa2(event);
      });
    });
    llista.append(elementLlista);
  }
}

function fletxa3() {
  let elementLlista = this.parentElement.parentElement;
  let funcio = this.className;
  let rgb = [
    parseInt(this.color.color.slice(1, 3), 16),
    parseInt(this.color.color.slice(3, 5), 16),
    parseInt(this.color.color.slice(5, 7), 16),
  ];
  console.log(funcio, rgb, this.color.color);

  if (funcio == "up") {
    rgb = rgb.map((c) => (c + 5 > 255 ? 255 : c + 5));
  }
  if (funcio == "down") {
    rgb = rgb.map((c) => (c - 5 <= 0 ? 0 : c - 5));
  }

  let newColor = `#${Number(rgb[0]).toString(16)}${Number(rgb[1]).toString(
    16
  )}${Number(rgb[2]).toString(16)}`; // si te una xifra falla
  console.log(funcio, rgb, newColor);

  this.color.color = newColor;
  elementLlista.style.backgroundColor = newColor;
}

class Color {
  constructor(color, posicio) {
    this.color = color;
    this.posicio = posicio;
  }
  render(llista) {
    let elementLlista = document.createElement("li");
    elementLlista.id = `element3_${this.posicio}`;
    elementLlista.innerHTML = `${this.posicio} <div class="buttons"><button class="up">▲</button><button class="down">▼</button></div>`; // Pensar si és millor així o creant-los
    let buttons = elementLlista.querySelectorAll("button");
    buttons.forEach((b) => {
      b.color = this;
      b.addEventListener("click", fletxa3);
    });
    llista.append(elementLlista);
  }
}

function plenarLlista3(llista) {
  for (let i = 0; i < 10; i++) {
    let color = new Color("#AABBCC", i);
    color.render(llista);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let llista1 = document.querySelector("#llista1");
  plenarLlista(llista1);
  let llista2 = document.querySelector("#llista2");
  plenarLlista2(llista2);
  let llista3 = document.querySelector("#llista3");
  plenarLlista3(llista3);
});
//})();
