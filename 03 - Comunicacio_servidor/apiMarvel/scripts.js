(() => {
  let charactersList = {};
  let charactersDatabase = {};
  let pagines = 0;
  let off = 0;
  let lim = 20;

  async function allCharacters(container, offset, limit) {
    container.innerHTML = "";
    //console.log(charactersList);
    if (charactersList[offset].length == 0) {
      charactersList[offset] = await getCharacters(offset, limit);
    }
    charactersList[offset].map((c) => {
      c.renderCard(container);
    });

    // Paginacio
    let divPagines = document.createElement("div");
    //divPagines.classList.add("btn-group");
    for (let i = 0; i < pagines; i++) {
      let paginaButton = document.createElement("button");
      paginaButton.classList.add("btn");

      if (i * 20 == off) {
        paginaButton.classList.add("btn-primary");
      } else {
        paginaButton.classList.add("btn-secondary");
      }

      paginaButton.innerHTML = i;
      paginaButton.addEventListener("click", () => {
        //console.log("Pagina", i);
        off = i * 20;
        allCharacters(container, off, lim);
      });

      divPagines.append(paginaButton);
    }
    document.querySelector("#pagines").innerHTML = "";
    document.querySelector("#pagines").append(divPagines);
  }

  class Character {
    constructor(dades) {
      Object.assign(this, dades);
      this.comicsDetails = [];
      this.thumbnail = `${this.thumbnail.path}/standard_fantastic.${this.thumbnail.extension}`;
      this.completed = false;
      charactersDatabase[this.id] = this;
    }
    renderCard(container) {
      let divCharacter = document.createElement("div");
      divCharacter.innerHTML = `
      <div class="col">
      <div class="card" style="width: 15rem;">
      <img src="${this.thumbnail}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${this.name}</h5>
        <p class="card-text">${this.description}</p>
        <a href="#" class="btn btn-primary">Details</a>
      </div>
    </div>
    </div>
        `;
      container.append(divCharacter);
      divCharacter.querySelector(".btn").addEventListener("click", async () => {
        let characterDetail = await getCharacterDetail(this.id);
        // console.log(characterDetail);
        characterDetail.renderDetails(container);
      });
    }
    renderDetails(container) {
      let divCharacter = document.createElement("div");
      divCharacter.innerHTML = `
      <div class="col">
      <div class="card" style="width: 40rem;">
      <img src="${this.thumbnail}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${this.name}</h5>
        <p class="card-text">${this.description}</p>
        <ul class="comicsList list-group">
        </ul>
        <a href="#" class="btn btn-primary">Return</a>
      </div>
    </div>
    </div>
        `;
      container.innerHTML = "";
      container.append(divCharacter);
      let ulComics = divCharacter.querySelector(".comicsList");
      this.comicsDetails.map((c) => {
        let liComic = document.createElement("li");
        liComic.classList.add("list-group-item");
        liComic.innerHTML = `
        <img class="img-fluid" src="${c.thumbnail.path}/standard_fantastic.${c.thumbnail.extension}">
        <h6>${c.title}</h6>
        <p>${c.description}</p>
        `;
        ulComics.append(liComic);
      });
      //divCharacter.append(ulComics);
      divCharacter.querySelector(".btn").addEventListener("click", () => {
        allCharacters(container, off, lim);
      });
    }
  }

  async function getCharacters(offset, limit) {
    let response;
    try {
      response = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters?limit=${limit}&offset=${offset}&apikey=09186f978ec0616e9dba9c4ac4b0c4bb`
      );
    } catch (e) {
      console.log(e);
      return [];
    }

    let data = await response.json();

    /* fetch(
        "https://gateway.marvel.com:443/v1/public/characters?apikey=09186f978ec0616e9dba9c4ac4b0c4bb"
      ).then((response)=>{
          return response.json()
      }).then((data)=>{
          console.log(data);
      });*/

    // PAGINACIO

    let total = data.data.total;
    pagines = total / 20;
    for (i = 0; i < pagines; i++) {
      if (!(i * 20 in charactersList)) charactersList[i * 20] = [];
    }

    return data.data.results.map((c) => new Character(c));
  }

  async function getCharacterDetail(id) {
    /* let response = await fetch(
       `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=09186f978ec0616e9dba9c4ac4b0c4bb`
     );
     let data = await response.json();
     console.log(data);*/

    // let character = new Character(data.data.results[0]);
    let character = charactersDatabase[id];
    if (!character.completed) {
      let comics = character.comics.items.map((c) =>
        fetch(`${c.resourceURI}?apikey=09186f978ec0616e9dba9c4ac4b0c4bb`)
      );

      let comicResponses = await Promise.all(comics);
      let comicList = await Promise.all(comicResponses.map((c) => c.json()));

      comicList.map((c) => {
        character.comicsDetails.push(c.data.results[0]);
      });
    }

    /* Promise.all(comics)
      .then((comicResponses) => {
        return comicResponses.map((c) => c.json());
      })
      .then((ComicList) => {
        ComicList.map((c) =>
          c.then((data) => {
            console.log(data);
          })
        );
      });*/
    //console.log(character);
    character.completed = true;
    return character;
  }

  document.addEventListener("DOMContentLoaded", async () => {
    /* getCharacters().then((characters) => {
      console.log(characters);
    });*/
    const container = document.querySelector("#container");
    await getCharacters(off, 1); // per a plenar l'objecte
    allCharacters(container, off, lim);
  });
})();
