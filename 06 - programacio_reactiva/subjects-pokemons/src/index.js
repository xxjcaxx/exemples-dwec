import { pokemons } from "./pokedex.js";
import { BehaviorSubject, combineLatest, debounceTime, fromEvent, map, startWith, tap } from "rxjs";

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

const createElement = (element) => (html,id) => {
  const e = document.createElement(element);
  e.innerHTML = html;
  e.dataset.id = id;
  return e;
}

function printPokemons(pokemons,offset,limit) {
  console.log(pokemons.length,offset,limit);
  
  const pokemonDivs = pokemons.slice(offset,limit).map(renderPokemon);
  const container = document.querySelector("#container");
  container.replaceChildren(...pokemonDivs);
  const pagesDiv = document.querySelector("#pages");
  const nPages = Math.ceil(pokemons.length / (limit-offset));
  const pagesButtons = Array(nPages).fill(0).map((_,i)=>i).map(createElement('button'));
  pagesDiv.replaceChildren(...pagesButtons);
}

document.addEventListener("DOMContentLoaded", () => {

  const pokemons$ = new BehaviorSubject(pokemons);
  const currentPage$ = new BehaviorSubject({offset: 0, limit: 10});

  const pokemonSubscription = pokemons$.subscribe(pokemons => {
    currentPage$.next({offset: 0, limit: 10});
    //console.log("sdfsdf");
    
    //printPokemons(pokemons,currentPage$.getValue().offset,currentPage$.getValue().limit);
  });

  const changePage$ = fromEvent(document.querySelector("#pages"),'click').pipe(
    
    map(e => e.target.dataset.id),
    startWith(0),
    map(p=> ({offset: p*10, limit: p*10+10}))
  )

  const changePageSubscription = changePage$.subscribe(currentPage$);
  const currentPageSubscription = currentPage$.subscribe(p=> {
  //  console.log(p);
   // printPokemons(pokemons$.getValue(),p.offset,p.limit);
  });

  const pokemonsPages$ = combineLatest([pokemons$,currentPage$]).pipe(
    tap(console.log)
  ).subscribe(([pok,page])=>{
    printPokemons(pok,page.offset,page.limit);
  })


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
