import { pokemons } from "./iteradors.js";

function calcPower(pokemon){
  const poders = Object.values(pokemon.base);
  return Math.round(poders.reduce((suma,poder)=>suma+poder)/poders.length)
}

function renderPokemons(pokemons){
  let divPokemons = pokemons
      .map((p) =>  `<div id="pokemon-${p.id}" data-type="pokemonCard">
            <h3>${p.name.english}</h3>
            <p>Type: ${p.type}</p>
            <p>Power: ${p.power} </p>
            </div>`
      )
      .join('');
      return divPokemons;
}

// Modificar per a que mostre els superiors al que fem click

(() => {
  document.addEventListener("DOMContentLoaded", () => {

    let contenedor = document.querySelector("#pokemons");
    let pokemonsPower = pokemons
      .map(p=> { 
        const pCopy = structuredClone(p)
        pCopy.power = calcPower(p); 
        return pCopy
      })

    contenedor.innerHTML = renderPokemons(pokemonsPower);

    contenedor.addEventListener('click',(event)=>{
      if(event.target.dataset.type === 'pokemonCard'){
        let idBase = event.target.id.split('-')[1];
        let powerBase = pokemonsPower.find(p => p.id == idBase).power;
        contenedor.innerHTML = renderPokemons(
          pokemonsPower.filter(p => p.power >= powerBase)
        )
        
      }
      
      
    });

  });
})();

