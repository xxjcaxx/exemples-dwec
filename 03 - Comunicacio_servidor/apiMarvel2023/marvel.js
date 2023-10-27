function generateDivCharacter(character) {
  let divCharacter = document.createElement("div");
  divCharacter.classList.add("col");
  divCharacter.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}" class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title">${character.name}</h5>
         <p class="card-text">${character.description}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
    `;
  return divCharacter;
}

function getCharacters() {
  return fetch(
    "https://gateway.marvel.com/v1/public/characters?limit=20&offset=0&apikey=09186f978ec0616e9dba9c4ac4b0c4bb"
  ).then((response) => {
    return response.json().then((datos) => {
        return datos.data.results;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#container");

  getCharacters().then((results)=> {
    for (let character of results) {
        container.append(generateDivCharacter(character));
      }
  });

});
