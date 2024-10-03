const apiKey = "09186f978ec0616e9dba9c4ac4b0c4bb";

/*
Millores:
Fer funcionar el  return dels personatges
Fer funcionar les fotos dels comics
Fer funcionar el buscador
*/

function generateDivCharacterDetails(character) {
  let divCharacter = document.createElement("div");
  divCharacter.classList.add("col");
  divCharacter.innerHTML = `
    <div class="card" style="width: 38rem;">
        <img src="${character.thumbnail.path}/portrait_fantastic.${
    character.thumbnail.extension
  }" class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title">${character.name}</h5>
         <p class="card-text">${character.description}</p>
         <div class="comics row"> 
         ${character.comics.items
           .map(
             (c, i) => `<div class="col" id="comic_${i}">${c.name}
                                                  <img src="book-cover-placeholder.png">   
                                              </div>`
           )
           .join(" ")} </div>
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
  divCharacter.querySelector("button").addEventListener("click", () => {
    const container = document.querySelector("#container");
    container.innerHTML = "";
    container.append(generateDivCharacterDetails(character));
  });
  return divCharacter;
}

function generatePaginationButtons(data) {
  const {offset, limit, total, count } = data;
  const currentPage = offset / limit;
  const nPages = Math.ceil(total / limit);
  const divButtons = document.createElement("div");
  divButtons.innerHTML = `
    <div
      class="btn-toolbar navbar-nav me-auto mb-2 mb-lg-0"
      role="toolbar"
      aria-label="Toolbar with button groups"
    >
      <div class="btn-group me-2" role="group" aria-label="First group" id="buttonsGroup">
        
      </div>
    </div>
  `;
  const buttonsGroup = divButtons.querySelector('#buttonsGroup');
  const visiblePages = Array(nPages)
  .fill(0)
  .map((v,i)=> i)
  .filter(v=> (v < 3) || (v > (currentPage-3) && (v < currentPage +3)) || (v > nPages - 4) )
  .map((v,i,pages)=>  Math.abs(pages[i+1] - v) > 1 ? [v,-1] : v)
  .flat();

  console.log(visiblePages, currentPage, nPages);
  
  for(let i of visiblePages){
    const pageButton = document.createElement('div');
    pageButton.innerHTML = `<button type="button" class="btn btn-primary" data-page="${i}">${i}</button>`;
    const button = pageButton.firstElementChild;

    if(i === currentPage){
      button.classList.add("active");
    }
    if(i === -1){
      button.classList.add("disabled");
      button.innerText = '...';
    }

    buttonsGroup.append(pageButton.firstElementChild);
  }

  buttonsGroup.addEventListener('click',(event)=>{
    const pageClicked = event.target.dataset.page;      
    getAndRenderCharacters(limit,limit*pageClicked);
  });

  divButtons.append(buttonsGroup);
  return divButtons;
}

async function fetchAPI(url, apiKey, limit, offset) {
  let response = await fetch(
    `${url}?limit=${limit}&offset=${offset}&apikey=${apiKey}`
  );
  let data = await response.json();
  return data.data;
}

function getCharacters(limit,offset) {
  return fetchAPI(
    "https://gateway.marvel.com/v1/public/characters",
    apiKey,
    limit,
    offset
  );
}

function getAndRenderCharacters(offset,limit){
  const container = document.querySelector("#container");
  const buttonsPlace = document.querySelector('#navbarSupportedContent div');
  container.innerHTML = "";
  buttonsPlace.innerHTML ="";
  getCharacters(offset,limit).then((data) => {
    for (let character of data.results) {
      container.append(generateDivCharacter(character));
    }
    buttonsPlace.append(generatePaginationButtons(data));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getAndRenderCharacters(20,0);
});
