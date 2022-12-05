function getPokemonTemplate(pokemon) {
  let pokemonTemplate = document.createElement('div');
  pokemonTemplate.classList.add("pokemon")
  pokemonTemplate.innerHTML = `
        <h2 class="name">${pokemon.name.english}</h2>
        <p>${pokemon.type}</p>
    `;
    
  return pokemonTemplate;
}


document.addEventListener('DOMContentLoaded',()=>{
    fetch("pokedex.json")
    .then((resposta) => {
      return resposta.json();
    })
    .then((pokemonsArray) => {
        for(let p of pokemonsArray){
            document.querySelector('#container').append(getPokemonTemplate(p))
        }
    });
});


