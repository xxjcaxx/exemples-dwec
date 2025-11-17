import { pokemons } from "./pokedex.js";
import { BehaviorSubject, debounceTime, fromEvent, map, tap } from "rxjs";

function renderPokemon(p) {
  const pokemonDivContent = `<div class="pokemonCard" data-id-pokemon="${p.id}">
    <h2>${p.name.english}</h2>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png">
    <div >
    <span>Type: ${p.type}</span> <span>Attack: ${p.base.Attack}</span>
    </div>
    </div>`;
  const pokemonDiv = document.createElement("div");
  
  pokemonDiv.innerHTML = pokemonDivContent;
  pokemonDiv.firstChild.addEventListener('click',e=> e.stopPropagation())
  return pokemonDiv.firstChild;
}

function printPokemons(pokemons) {
  const pokemonDivs = pokemons.map(renderPokemon);
  const container = document.querySelector("#container");
  /*container.innerHTML = "";
  container.append(...pokemonDivs);*/
  container.replaceChildren(...pokemonDivs);
}

document.addEventListener("DOMContentLoaded", () => {

  const pokemons$ = new BehaviorSubject(pokemons);

  const pokemonSubscription = pokemons$.subscribe(pokemons => {
    printPokemons(pokemons.slice(0, 10));
  });

  

  // Llistar els tipus en botons i filtrar per tipus
  const tipos = [...new Set([...pokemons.map((p) => p.type).flat()])];

  const botons = tipos.map((t) => {
    const buttonTipo = document.createElement("button");
    buttonTipo.innerText = t;
    const tipoClickSubscription = fromEvent(buttonTipo,"click")
    .pipe(
      tap(console.log),
      map(()=> pokemons.filter((p) => p.type.includes(t)))
    )
    .subscribe(pokemons$)
    return buttonTipo;
  });

  const navBar = document.querySelector("#navbar");

  const resetButton = document.createElement("button");
  resetButton.innerText = "Reset";
  fromEvent(resetButton,"click").subscribe(()=>
    pokemons$.next(pokemons)
  );
 
  const sortButtons = `
  <button id="sort-name">Sort By name</button>
  <form id="buscador">
    <input type="text" id="input-search" placeholder="buscar...">
    <button type="submit" id="button-search">Buscar</button>
</form>
  `;
  const divSortButtons = document.createElement("div");
  divSortButtons.innerHTML = sortButtons;
  const sortButton = divSortButtons.querySelector("#sort-name");
  fromEvent(sortButton,"click").pipe(
    map(()=> [...pokemons].sort((a, b) =>      
      a.name.english < b.name.english ? -1 : 1)
    )
    ).subscribe(pokemons$);


  const buttonSearch = divSortButtons.querySelector('#button-search');
  const inputSearch = divSortButtons.querySelector('#input-search');
  fromEvent(buttonSearch,"click").pipe(
    tap(event => event.preventDefault()),
    map(()=> inputSearch.value),
    map(searchText => pokemons.filter(p=> p.name.english.toLowerCase().includes(searchText.toLowerCase())))
  ).subscribe(pokemons$);

  fromEvent(inputSearch,"keyup").pipe(
    debounceTime(500),
    map(()=> inputSearch.value),
    map(searchText => pokemons.filter(p=> p.name.english.toLowerCase().includes(searchText.toLowerCase())))
  ).subscribe(pokemons$);
/*
  inputSearch.addEventListener('keyup', (e)=>{
    const searchText = inputSearch.value;
     const filteredPokemons = pokemons.filter(p=> p.name.english.toLowerCase().includes(searchText.toLowerCase()))
     printPokemons(filteredPokemons.slice(0, 20));
     console.log(e.code);
*/
     
 // });



  navBar.append(divSortButtons, resetButton, ...botons);

  // Fer un buscador per nom

  // Fer botons per ordenar

  // Fer paginació

  document.querySelector('#container').addEventListener('click',(e)=>{
    console.log(e.target)
    if([...e.target.classList].includes('pokemonCard')){
     e.target.style.background = "rgb(230, 226, 40)";
     console.log(e.target.dataset.idPokemon);
     
    }

  })
});
