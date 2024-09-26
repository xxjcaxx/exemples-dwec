import './styles.scss'
import * as bootstrap from 'bootstrap'

import { pokemons } from "./iteradors.js";
import pokemonplaceholder from './imgs/pokemonplaceholder.jpg';

function calcPower(pokemon){
  const poders = Object.values(pokemon.base);
  return Math.round(poders.reduce((suma,poder)=>suma+poder)/poders.length)
}

function renderPokemons(pokemons){
  const pokemonsContainer = document.createElement('div')
  pokemons
      .forEach((p) => { 
        const HTMLPokemon = `<div id="pokemon-${p.id}" data-type="pokemonCard">
           <img src="${p.image ? `./imgs/${p.image}` : pokemonplaceholder}" class="img-fluid" alt="${p.name.english}">
        <h3>${p.name.english}</h3>
            <p>Type: ${p.type}</p>
            <p>Power: ${p.power} </p>
            </div>`;
          const divPokemon = document.createElement('div');
          divPokemon.innerHTML = HTMLPokemon;
          
          pokemonsContainer.append(divPokemon.firstElementChild);
          }
      )
    
  
      return pokemonsContainer;
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

    contenedor.append(renderPokemons(pokemonsPower));

    contenedor.addEventListener('click',(event)=>{
      if(event.target.dataset.type === 'pokemonCard'){
        let idBase = event.target.id.split('-')[1];
        let powerBase = pokemonsPower.find(p => p.id == idBase).power;
        contenedor.append(renderPokemons(  pokemonsPower.filter(p => p.power >= powerBase)));
       
        
      }
      
      
    });

  });
})();

