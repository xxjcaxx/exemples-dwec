import './style.css'

const compose = (...fns) => x => fns.reduceRight(async(v, f) => f(await v), x);
const addImgUrL = (artWork) => (artWork.img_url = `https://www.artic.edu/iiif/2/${artWork.image_id}/full/843,/0/default.jpg`,artWork);
const addImgUrLArray = (artWorks) => artWorks.map(addImgUrL);
const json = (request) => request.json();
const getURL = async (url) =>  compose(json,fetch)(url); 
const getArtWorks = async (url) => compose(addImgUrLArray,r=>r.data,getURL)(url); 
const consoleLog = (datos) => console.log(datos);

class ArtworkComponent extends HTMLElement {

  constructor() {
    super();
    this.like = false;
  }

  connectedCallback() {
    const {title,description,img_url} = this.dataset;
    this.innerHTML = `
    <div class="card">
  <div class="image-container">
    <img src="${img_url}" alt="${title}" class="card-image" />
  </div>
  <div class="card-content">
    <span class="like">🖤</span>
    <h2 class="card-title">${title}</h2>
    <p class="card-description">${description}</p>
  </div>
</div>`;

  const likeButton = this.querySelector('.like'); 
  likeButton.addEventListener('click',()=>{
    this.like = !this.like;
    likeButton.innerHTML = this.like ? '❤️' : '🖤';
    this.dispatchEvent(
      new CustomEvent("like", {
        bubbles: true,
        detail: {
          like: this.like
        },
      })
    );
  });
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}.`);
  }
}

customElements.define("custom-artwork", ArtworkComponent);



const generateGallery = (artworks) => artworks.map(artwork => {
  const {title,description,img_url} = artwork;
  let customElement = document.createElement("custom-artwork");
  Object.assign(customElement.dataset, {title,description,img_url} );
  return customElement;
})





document.addEventListener("DOMContentLoaded",()=>{
    compose(
      (artworksDivs)=> document.querySelector('#app').append(...artworksDivs)
      ,generateGallery,
      getArtWorks)
      ('https://api.artic.edu/api/v1/artworks');


      document.addEventListener('like',(event)=>{
        console.log(event.detail);
        
      })
});

