import './style.css'

//Exercici 4
const compose = (...fns) => x => fns.reduceRight(async(v, f) => f(await v), x)

const addImgUrL = (artWork) => (artWork.img_url = `https://www.artic.edu/iiif/2/${artWork.image_id}/full/843,/0/default.jpg`,artWork)
const addImgUrLArray = (artWorks) => artWorks.map(addImgUrL)

// Exercici 1

const json = (request) => request.json();
const getURL = async (url) =>  compose(json,fetch)(url); 

const getArtWorks = async (url) => compose(addImgUrLArray,r=>r.data,getURL)(url) 

// Exercici2
const generateHTMLArtworks = (artList) => artList.map(artWork => `
<div class="artWork">
<img src="${artWork.img_url}"/>
<h2>${artWork.title}</h2>
<p>${artWork.provenance_text}</p>
</div>
`)
.join(' ');
;

const fillContainer = (container) => (artList) => {
    container.innerHTML = generateHTMLArtworks(artList);
}

//Exercici 3
const extractDataURLS = (requests) => requests.data.map(artWork => getURL(artWork.api_link));
const extractData = (requests) => requests.map(artWork => artWork.data);

const searchArtWorks = async (filter) => {

    return compose(addImgUrLArray,
                   extractData,
                   p => Promise.all(p),
                   extractDataURLS,
                   getURL)
                   (`https://api.artic.edu/api/v1/artworks/search?q=${filter}`)
}


document.addEventListener('DOMContentLoaded', async ()=>{

    const divContainer = document.querySelector('#container')

    compose(fillContainer(divContainer),getArtWorks)('https://api.artic.edu/api/v1/artworks');
    // Exercici3
    document.querySelector('#busqueda_button').addEventListener('click', async ()=>{
        compose(fillContainer(divContainer),searchArtWorks)(document.querySelector('#busqueda').value)
    });

});

