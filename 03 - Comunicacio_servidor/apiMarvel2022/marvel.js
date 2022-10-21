function generateCharacterCard(character){
    let divCard = document.createElement('div');
    divCard.classList.add('col');
    divCard.innerHTML = `
    <div class="card" style="width: 18rem;">
  <img src="${character.thumbnail.path}.${character.thumbnail.extension}" class="card-img-top" alt="${character.name}">
  <div class="card-body">
    <h5 class="card-title">${character.name}</h5>
    <p class="card-text">
    ${this.description}
    </p>
    <a href="#" class="btn btn-primary">Details</a>
  </div>
</div>
    `;
    return divCard;
}

function printCharacters(characterList){
    console.log(characterList);
    let characterListDiv = document.querySelector('#characterList'); 
    for(let character of characterList){
        characterListDiv.append(generateCharacterCard(character));
    }
}


document.addEventListener('DOMContentLoaded',()=>{
   
    let peticio = fetch('https://gateway.marvel.com:443/v1/public/characters?apikey=09186f978ec0616e9dba9c4ac4b0c4bb');
    peticio.then(response => response.json())
    .then(datos => datos.data.results)
    .then(printCharacters);

});

