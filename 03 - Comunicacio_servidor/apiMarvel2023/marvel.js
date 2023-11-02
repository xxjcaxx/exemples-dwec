const apiKey = '09186f978ec0616e9dba9c4ac4b0c4bb';

function generateDivCharacterDetails(character){
  let divCharacter = document.createElement("div");
  divCharacter.classList.add("col");
  divCharacter.innerHTML = `
    <div class="card" style="width: 38rem;">
        <img src="${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}" class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title">${character.name}</h5>
         <p class="card-text">${character.description}</p>
         <div class="comics row"> 
         ${character.comics.items.map((c,i) => `<div class="col" id="comic_${i}">${c.name}
                                                  <img src="book-cover-placeholder.png">   
                                              </div>`).join(' ')} </div>
          <button href="#" class="btn btn-primary">Return</button>
          </div>
        </div>
    `;
    
    
  return divCharacter;
}

function generateDivCharacter(character) {
  let divCharacter = document.createElement("div");
  divCharacter.classList.add("col");
  divCharacter.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}" class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title">${character.name}</h5>
         <p class="card-text">${character.description}</p>
          <button href="#" class="btn btn-primary">Details</button>
          </div>
        </div>
    `;
    divCharacter.querySelector('button').addEventListener('click',()=>{
      const container = document.querySelector("#container");
      container.innerHTML = '';
      container.append(generateDivCharacterDetails(character));
    });
  return divCharacter;
}

async function fetchAPI(url,apiKey,limit,offset){
  let response = await fetch(`${url}?limit=${limit}&offset=${offset}&apikey=${apiKey}`);
  let data = await response.json();
  return data.data.results;
}

function getCharacters() {
  return fetchAPI('https://gateway.marvel.com/v1/public/characters',apiKey,20,0);
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#container");

  getCharacters().then((results)=> {
    for (let character of results) {
        container.append(generateDivCharacter(character));
      }
  });

});
