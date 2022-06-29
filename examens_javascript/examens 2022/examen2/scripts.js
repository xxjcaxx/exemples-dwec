(() => {
  const url = "https://rickandmortyapi.com/api/character";

  const obtenirAPI = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const obtenirCharacters = async (url) => {
    const data = await obtenirAPI(url);
    const items = data.results;
    return items;
  };

  const obtenirEpisode = async (url) => {
    const data = await obtenirAPI(url);
    return data;
  };

  class Episode {
    constructor(id, url, character) {
      this.id = id;
      this.character = character;
      this.url = url;
      this.name = "▩▩▩▩▩▩▩▩▩▩▩▩";
      this.identifier = "▩▩▩▩▩▩▩▩▩▩▩▩";
      //console.log(id,url);
      this.data = this.obtenirData(url);
      //this.render(this.data);
    }

    obtenirData(url) {
      return obtenirEpisode(url).then((e) => {
        this.name = e.name;
        this.identifier = e.episode;
        return { name: e.name, identifier: e.episode, id: e.id };
      });
    }

    render(promesaData, li) {
      li.innerHTML = `▩▩▩▩▩▩▩▩▩▩▩▩ - ▩▩▩▩▩▩▩▩▩▩▩▩`;
      promesaData.then((datos) => {
        li.innerHTML = `${datos.identifier} - ${datos.name}`;
      });
    }
  }

  class Character {
    constructor(id, name, image, episode) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.episodes = episode.map(
        (e) => new Episode(e.split("/").pop(), e, this)
      );
      this.divCharacter = document.createElement("div");
    }

    render() {
      const divCharacter = this.divCharacter;
      divCharacter.classList.add("character");
      divCharacter.id = "character-" + this.id;
      divCharacter.innerHTML = `<img src="${this.image}"/><h2>${this.name}</h2>`;
      const buttonOrderid = document.createElement("button");
      buttonOrderid.innerHTML = "Ordenar por Identificador";
      const buttonOrderName = document.createElement("button");
      buttonOrderName.innerHTML = "Ordenar por Nombre";
      divCharacter.append(buttonOrderid);
      divCharacter.append(buttonOrderName);
      buttonOrderid.addEventListener("click", () => {
        this.order("identifier");
      });
      buttonOrderName.addEventListener("click", () => {
        this.order("name");
      });
      const ulEpisodes = document.createElement("ul");
      const lisEpisodes = this.episodes.map((e) => {
        const liEpisode = document.createElement("li");
        e.render(e.data, liEpisode);
        return liEpisode;
      });
      lisEpisodes.forEach((liEp) => ulEpisodes.append(liEp));

      divCharacter.append(ulEpisodes);
      return divCharacter;
    }

    order(criteri) {
      this.episodes.sort((a, b) => (a[criteri] >= b[criteri] ? 1 : -1));
      this.render();
    }
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const charactersData = await obtenirCharacters(url);
    const characters = charactersData.map(
      (c) => new Character(c.id, c.name, c.image, c.episode)
    );
    const container = document.querySelector("#container");
    characters.forEach((character) => {
      container.append(character.render());
    });
  });
})();

////////////////////////
/*
Exercici 2

*/

document.addEventListener("DOMContentLoaded", () => {
  //a

  const desp = (array) => [...array.slice(1), array[0]];

  // b

  const desp2D = (array) =>
    array
      .reduce(
        (anterior, actual) => {
          console.log(anterior);
          return [...anterior, desp(anterior.at(-1))];
        },
        [desp(array)]
      )
      .slice(0, -1);

  // c

  const desp2DString = (string) =>
    desp2D(string.split("")).map((s) => s.join(""));

  mocha.setup("bdd");
  mocha.checkLeaks();

  const expect = chai.expect;

  describe("desp", () => {
    it("desp 4", () => {
      expect(desp([1, 2, 3, 4])).to.eql([2, 3, 4, 1]);
    });
    it("desp 5", () => {
      expect(desp([1, 2, 3, 4, 5])).to.eql([2, 3, 4, 5, 1]);
    });
  });

  describe("desp2D", () => {
    it("desp2D 4", () => {
      expect(desp2D([1, 2, 3, 4])).to.deep.eql([
        [2, 3, 4, 1],
        [3, 4, 1, 2],
        [4, 1, 2, 3],
        [1, 2, 3, 4],
      ]);
    });
  });

  describe("desp2DString", () => {
    it("desp2DString", () => {
      expect(desp2DString("abcdef")).to.deep.eql([
        "bcdefa",
        "cdefab",
        "defabc",
        "efabcd",
        "fabcde",
        "abcdef",
      ]);
    });
  });

  mocha.run();
});
