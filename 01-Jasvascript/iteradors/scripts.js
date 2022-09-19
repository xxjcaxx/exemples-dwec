import { pokemons } from "./iteradors.js";

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    let contenedor = document.querySelector("#pokemons");
    let total = pokemons
      .filter((p) => p.type.includes("Grass"))
      .map((p) => {
        let divPokemon = document.createElement("div");
        divPokemon.innerHTML = `<h3>${p.name.english}</h3>
            <p>Type: ${p.type}</p>
            <p>Attack: ${p.base.Attack} </p>`;
        contenedor.append(divPokemon);
        return p;
      });
    let mitjana =
      total.reduce((anterior, actual) => anterior + actual.base.Attack, 0) /
      total.length;
    // console.log(total, mitjana);
  });
})();

