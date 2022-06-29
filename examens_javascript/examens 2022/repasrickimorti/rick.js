class Character {
  constructor(dades) {
    Object.assign(this, dades);
    this.Episodes = this.episode.map((e) => new Episode(e));
  }
  render() {
    let divCharacter = document.createElement("div");
    divCharacter.id = `character${this.id}`;
    divCharacter.classList.add("character");
    divCharacter.innerHTML = `
              <h2>${this.name}</h2>
              <img src="${this.image}"/>

              `;
    let orderByEpisode = document.createElement("button");
    orderByEpisode.innerHTML = "Ordenar por ID";
    divCharacter.append(orderByEpisode);
    let orderByName = document.createElement("button");
    orderByName.innerHTML = "Ordenar por Nombre";
    divCharacter.append(orderByName);

    orderByEpisode.addEventListener("click", () => {
      ulEpisodes.innerHTML = "";
      this.Episodes.sort((a, b) => (a.episode > b.episode ? 1 : -1));
      this.appendEpisodes(ulEpisodes);
    });

    orderByName.addEventListener("click", () => {
      ulEpisodes.innerHTML = "";
      this.Episodes.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.appendEpisodes(ulEpisodes);
    });

    let ulEpisodes = document.createElement("ul");
    divCharacter.append(ulEpisodes);
    this.appendEpisodes(ulEpisodes);
    return divCharacter;
  }

  appendEpisodes(ul) {
    this.Episodes.forEach((e) => {
      ul.append(e.liEpisode);
    });
  }
}

class Episode {
  constructor(url) {
    this.url = url;
    this.episode = "▩▩▩▩▩▩▩▩▩▩▩▩";
    this.name = "▩▩▩▩▩▩▩▩▩▩▩▩";
    this.liEpisode = document.createElement("li");
    this.render();
    this.download();
  }
  render() {
    this.liEpisode.innerHTML = `${this.episode} - ${this.name}`;
  }
  async download() {
    const responseEpisode = await fetch(this.url);
    const episodeJSON = await responseEpisode.json();
    this.episode = episodeJSON.episode;
    this.name = episodeJSON.name;
    this.render();
  }
}

(() => {
  document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector("#container");

    const responseCharacters = await fetch(
      "https://rickandmortyapi.com/api/character"
    );
    const charactersJSON = await responseCharacters.json();
    //console.log(characters);

    const charactersList = charactersJSON.results.map((c) => new Character(c));
    //console.log(charactersList);

    charactersList.forEach((c) => container.append(c.render()));
  });
})();
