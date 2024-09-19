import { pokemons } from "./iteradors.js";

function calcPower(pokemon){
  const poders = Object.values(pokemon.base);
  return Math.round(poders.reduce((suma,poder)=>suma+poder)/poders.length)
}

// Modificar per a que mostre els superiors al que fem click

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    let BulbasaurPower = calcPower(pokemons.find(p=> p.name.english === 'Bulbasaur'))
    let contenedor = document.querySelector("#pokemons");
    let total = pokemons
      .map(p=> { 
        const pCopy = structuredClone(p)
        pCopy.power = calcPower(p); 
        return pCopy
      })
      .filter(p => p.power >= BulbasaurPower)
      .map((p) =>  `<div><h3>${p.name.english}</h3>
            <p>Type: ${p.type}</p>
            <p>Power: ${p.power} </p>
            </div>`
      )
      .join('');
    contenedor.innerHTML = total
   
  });
})();

