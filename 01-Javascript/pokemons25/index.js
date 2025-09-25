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
  // Mostrar tots els pokemons a la web
  // Mostrar els primers 10 pokemons
  // Mostrar els pokemons en "Cards" https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png

  printPokemons(pokemons.slice(0, 10));

  // Llistar els tipus en botons i filtrar per tipus
  const tipos = [...new Set([...pokemons.map((p) => p.type).flat()])];

  const botons = tipos.map((t) => {
    const buttonTipo = document.createElement("button");
    buttonTipo.innerText = t;
    buttonTipo.addEventListener("click", () => {
      console.log(t);
      const filteredPokemons = pokemons.filter((p) => p.type.includes(t));
      printPokemons(filteredPokemons.slice(0, 20));
    });
    return buttonTipo;
  });

  const navBar = document.querySelector("#navbar");

  const resetButton = document.createElement("button");
  resetButton.innerText = "Reset";
  resetButton.addEventListener("click", () => {
    printPokemons(pokemons.slice(0, 10));
  });

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
  sortButton.addEventListener("click", () => {
    const sortedPokemons = [...pokemons].sort((a, b) => {     
     return a.name.english < b.name.english ? -1 : 1
    }
    );
    printPokemons(sortedPokemons.slice(0, 20));
  });

  const buttonSearch = divSortButtons.querySelector('#button-search');
  buttonSearch.addEventListener('click',(event)=>{
    event.preventDefault();
    const searchText = divSortButtons.querySelector('#input-search').value;
    const filteredPokemons = pokemons.filter(p=> p.name.english.toLowerCase().includes(searchText.toLowerCase()))
     printPokemons(filteredPokemons.slice(0, 20));
  });

  navBar.append(divSortButtons, resetButton, ...botons);

  // Fer un buscador per nom

  // Fer botons per ordenar

  // Fer paginació
});
