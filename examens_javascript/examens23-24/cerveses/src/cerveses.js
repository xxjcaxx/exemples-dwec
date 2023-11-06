import { beers } from "./beers.js";
export {generateDivsBeers, addDivs, sortBy, compareBeers, findSimilarBeers}

////////// 1

function generateDivsBeers(beers){
    return beers.map(beer => {
        const divBeer = document.createElement('div');
        divBeer.classList.add('col');
        divBeer.innerHTML = `
        <img style="width: 80px" src="${beer.image_url}">
        <h2>${beer.name}</h2>
        <h3>${beer.tagline}</h3>
        <p>${beer.description}</p>
        <ul>
        <li>ABV: ${beer.abv}</li>
        <li>IBU: ${beer.ibu}</li>
        <li>EBC: ${beer.ebc}</li>
        <li>PH: ${beer.ph}</li>
        <button>25 Similar</button>
        </ul>
        `;

        ///// 6
        divBeer.querySelector('button').addEventListener('click',()=>{
            let similar = findSimilarBeers(beer,beers);
            const container = document.querySelector('#container');
            container.innerHTML = '';
            addDivs(container,generateDivsBeers(similar));
        });


        return divBeer;
    });
}

/////////// 2

function addDivs(container,arrayDivs){
    container.append(...arrayDivs);
}

////// 3

function sortBy(comparationFunction, array) {
    return [...array].sort(comparationFunction);
}

//// 4 

document.addEventListener('DOMContentLoaded',()=>{
    const container = document.querySelector('#container');
    addDivs(container,generateDivsBeers(beers));

    document.querySelector('#botons').addEventListener('click',e=>{
        let buttonCriteria = e.target.id.split('_')[0];
        console.log(buttonCriteria);
        const sortCriteria = (a,b) => {
           return a[buttonCriteria] > b[buttonCriteria] ? -1 : 1;
        };
        container.innerHTML = '';
        addDivs(container,generateDivsBeers(sortBy(sortCriteria,beers)));
    });

});


///// 5 
function compareBeers(beer1, beer2) {
    let caracteristiques = ['abv','ibu','ebc','ph'];
    return caracteristiques.reduce((p,a)=>{
        return p + Math.abs(beer1[a] - beer2[a]);
    },0);
}


////// 6 

function findSimilarBeers(beer,array){
    let beersComparate = array.map(b => {
        return {id: b.id, similar: compareBeers(b,beer)}
    });
    let beersComparateSorted = sortBy((a,b) => a.similar > b.similar ? 1 : -1, beersComparate);
    let similarBeers = beersComparateSorted.map(b => array.find(B => B.id === b.id)).slice(0,25);
    return similarBeers;
} 