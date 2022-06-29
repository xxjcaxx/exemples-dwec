import { getNews, getOneArticle } from "./internet.js";

let offset = 0;
let visited = [];

if (localStorage.getItem("visited")) {
  visited = localStorage.getItem("visited").split(" ");
} else {
  localStorage.setItem("visited", "");
}

class Noticia {
  constructor(news) {
    this.imageUrl = news.imageUrl;
    this.newsSite = news.newsSite;
    this.publishedAt = news.publishedAt;
    this.summary = news.summary;
    this.title = news.title;
    this.url = news.url;
  }
  render(container) {
    let article = `
            <h3><a href="${this.url}">${this.title}</a></h3>
            <h4>${this.newsSite} ${this.publishedAt}</h4>
            <img src="${this.imageUrl}">
            <p>${this.summary}</p>
        `;
    container.innerHTML = article;
  }
  get(id, container, boto) {
    container.innerHTML = `<img src="loading.gif" />`;
    getOneArticle(id).then((news) => {
      visited.push(id + " ");
      localStorage.setItem("visited", visited.join(" "));
      this.imageUrl = news.imageUrl;
      this.newsSite = news.newsSite;
      this.publishedAt = news.publishedAt;
      this.summary = news.summary;
      this.title = news.title;
      this.url = news.url;
      this.render(container);
      container.append(boto);
    });
  }
}

(() => {
  document.addEventListener("DOMContentLoaded", async () => {
    async function rellenar() {
      let promiseNews = await getNews(offset);
      let newsList = promiseNews.map((n) => new Noticia(n));

      let newsDivs = newsList.map((n) => {
        let divNoticia = document.createElement("div");
        divNoticia.classList.add("noticia");
        let botoEliminar = document.createElement("button");
        botoEliminar.innerHTML = "X";
        botoEliminar.addEventListener("click", () => {
          visited = localStorage.getItem("visited").split(" ");
          let isNew = false;
          let numero;
          while (!isNew) {
            numero = Math.round(Math.random() * 10000) + "";
            visited.includes(numero) ? (isNew = false) : (isNew = true);
          }
          n.get(numero, divNoticia, botoEliminar);
        });
        n.render(divNoticia);
        divNoticia.append(botoEliminar);
        return divNoticia;
      });

      let container = document.querySelector("div.container");
      container.innerHTML = "";
      newsDivs.forEach((d) => {
        container.append(d);
      });
    }

    rellenar();

    document.querySelector("#refreshButton").addEventListener("click", () => {
      offset += 10;
      rellenar();
    });
  });
})();
