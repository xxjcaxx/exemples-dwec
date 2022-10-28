let apikey = '09186f978ec0616e9dba9c4ac4b0c4bb';

function generateCharacterDetail(character){
    console.log(character);
    let divCard = document.createElement('div');
    divCard.classList.add('col');
    divCard.innerHTML = `
    <div class="card" style="width: 50%;">
    <a href="#" class="back btn btn-primary">Back to list</a>
  <img src="${character.thumbnail.path}.${character.thumbnail.extension}" class="card-img-top" alt="${character.name}">
  <div class="card-body">
    <h5 class="card-title">${character.name}</h5>
    <p class="card-text">
    ${character.description}
    <div class="urls"></div>
    <div class="comics row"></div>
    </p>
    
  </div>
</div>
    `;
    let urlsDiv = divCard.querySelector('.urls');
    for (let url of character.urls){
        let p = document.createElement('p');
        p.innerHTML = `<a href="${url.url}">${url.type}</a>`;
        urlsDiv.append(p);
    }

    let comicsDiv = divCard.querySelector('.comics');
    for(let c of character.comics.items){
        let comicDiv = document.createElement('div');
        comicDiv.classList.add('col');
        comicDiv.innerHTML = `<a href="${c.resourceURI}"><h3>${c.name}</h3></a>`;
        comicsDiv.append(comicDiv);
        let URIhttps = c.resourceURI.replace(/http/,'https');
        fetch(URIhttps+'?apikey='+apikey)
        .then(response => response.json())
        .then(comicData=> {
            let img = document.createElement('img');
            img.src = comicData.data.results[0].thumbnail.path+'/portrait_fantastic.'+comicData.data.results[0].thumbnail.extension;
            comicDiv.append(img);
        });
    }

    divCard.querySelector('.back').addEventListener('click',()=>{
        mainList();
    });
    return divCard;
}


function generateCharacterCard(character){
    let divCard = document.createElement('div');
    divCard.classList.add('col');
    divCard.innerHTML = `
    <div class="card" style="width: 18rem;">
  <img src="${character.thumbnail.path}.${character.thumbnail.extension}" class="card-img-top" alt="${character.name}">
  <div class="card-body">
    <h5 class="card-title">${character.name}</h5>
    <p class="card-text">
    ${character.description}
    </p>
    <a href="#" class="details btn btn-primary">Details</a>
  </div>
</div>
    `;
    divCard.querySelector('.details').addEventListener('click',()=>{
        let characterListDiv = document.querySelector('#characterList');
        characterListDiv.innerHTML = '';
        characterListDiv.append(generateCharacterDetail(character));
    });
    return divCard;
}

function printCharacters(characterList){
    let characterListDiv = document.querySelector('#characterList'); 
    characterListDiv.innerHTML = '';
    for(let character of characterList){
        characterListDiv.append(generateCharacterCard(character));
    }
}

function generatePagination(qtyCharacters,limit,offset){
    let pages = Math.floor(qtyCharacters/20);
    currentPage = Math.floor(offset/20);
    let visiblePages = [0,1,currentPage-2,currentPage-1,currentPage,currentPage+1,currentPage+2,pages-1,pages];
    visiblePages = visiblePages.filter(p => p >= 0);
    visiblePages = [...new Set(visiblePages)];
    let pagesDiv = document.querySelector('#pagination');
    pagesDiv.innerHTML = '';
    for(let page of visiblePages){
        let pageButton = document.createElement('button');
        pageButton.innerHTML = page;
        pageButton.classList.add('page','btn','btn-primary');
        pageButton.addEventListener('click',()=>{
            mainList(limit,20*page);
        });
        pagesDiv.append(pageButton);
    }
}

/*function mainList(limit,offset){
    let peticio = fetch(`https://gateway.marvel.com:443/v1/public/characters?limit=${limit}&offset=${offset}&apikey=${apikey}`);
    peticio.then(response => response.json())
    .then(datos => { 
        let qtyCharacters = datos.data.total;
        generatePagination(qtyCharacters,limit,offset);
        return datos.data.results;
    })
    .then(printCharacters);
}*/

async function mainList(limit,offset){
    let resposta = await fetch(`https://gateway.marvel.com:443/v1/public/characters?limit=${limit}&offset=${offset}&apikey=${apikey}`);
    let datos = await resposta.json()
    generatePagination(datos.data.total,limit,offset);
    printCharacters(datos.data.results);
}

document.addEventListener('DOMContentLoaded',()=>{
   mainList(20,0);


});

