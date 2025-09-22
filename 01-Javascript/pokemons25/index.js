document.addEventListener("DOMContentLoaded", () => {
  // Mostrar tots els pokemons a la web
  // Mostrar els primers 10 pokemons
  // Mostrar els pokemons en "Cards" https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png

  const pokemonDivs = pokemons.map(
    (p) => { 
    const pokemonDivContent = `<div class="pokemonCard">
    <h2>${p.name.english}</h2>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png">
    <div >
    <span>Type: ${p.type}</span> <span>Attack: ${p.base.Attack}</span>
    </div>
    </div>`;
    const pokemonDiv = document.createElement('div');
    pokemonDiv.innerHTML = pokemonDivContent;
    return pokemonDiv.firstChild;

}).slice(0,10);
  const container = document.querySelector("#container");
  container.append(...pokemonDivs);


  // Llistar els tipus en botons i filtrar per tipus
  const tipos = [...new Set([...pokemons.map(p => p.type).flat()])] 

  const botons = tipos.map(t => {
    const buttonTipo = document.createElement('button');
    buttonTipo.innerText = t;
    buttonTipo.addEventListener('click',()=>{ console.log(t)})
    return buttonTipo;
  })

  const navBar = document.querySelector('#navbar');
  navBar.append(...botons);


  // Fer un buscador per nom

  // Fer paginació
});
