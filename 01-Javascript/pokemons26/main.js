import { pokemons } from "./pokedex.js";

console.log(pokemons);

function renderPokemon(pokemon) {
  return `<div class="pokemon-card">
            <h2>${pokemon.name.english}</h2>
            <p>${pokemon.base.Attack}</p>
            <p>${pokemon.base["Sp. Attack"]}</p>
        </div>`;
}

function convertPokemon(pokemon) {
  const divContent = `
            <h2>${pokemon.name.english}</h2>
            <p>${pokemon.base.Attack}</p>
            <p>${pokemon.base["Sp. Attack"]}</p>
        `;
   const div = document.createElement('div');
   div.innerHTML = divContent;
   div.classList.add('pokemon-card')
   return div;
}

document.addEventListener("DOMContentLoaded", () => {
  /*let pokemons_html = '';
   for(let pokemon of pokemons){
      pokemons_html += renderPokemon(pokemon);
   }*/
  /*document.querySelector("#content").innerHTML = pokemons
    .map(renderPokemon)
    .join("");*/

    /**
     * 
     * Crear un botó per a cada tipus de pokemon
     * Quan es fa click es mostren sols els d'eixe tipus
     */

  document.querySelector("#content").append(...pokemons.map(convertPokemon));
});
