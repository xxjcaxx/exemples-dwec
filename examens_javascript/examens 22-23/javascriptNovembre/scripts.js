(() => {

    function renderBeerCard(beer) {
        let divCard = document.createElement('div');
        divCard.classList.add('col-md-4');
        divCard.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
        <div class="col-md-2">
        <img src="default_beer.png" class="img-fluid rounded-start foto" alt="${beer.name}">
        </div>
        <div class="col-md-10">
    
  <div class="card-body overflow-auto" style="height:200px;">
    <h5 class="card-title">${beer.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${beer.tagline}</h6>
    <p class="card-text">
    <span class="badge bg-primary">ABV: ${beer.abv}</span>
    <span class="badge bg-success">IBU: ${beer.ibu}</span>
    <span class="badge bg-secondary">PH: ${beer.ph}</span>
    <span class="badge bg-warning">EBC: ${beer.ebc}</span>
    </p>
  
    <p class="card-text fs-6">${beer.description}</p>
    <p class="card-text fs-6">${beer.brewers_tips}</p>
   
  </div>
  <ul class="list-group list-group-flush list-food">
  </ul>
  </div>
  </div>
</div>
        `;

        let listFood = divCard.querySelector('.list-food');
        for (let food of beer.food_pairing) {
            listFood.innerHTML += ` <li class="list-group-item">${food}</li>`;
        }


        fetch(beer['image_url'])
            .then(response => response.status == 200 ? response : Promise.reject(response.status))
            .then(response => response.blob())
            .then(imageBlob => {
                let imageURL = URL.createObjectURL(imageBlob);
               
                divCard.querySelector('.foto').src = URL.createObjectURL(imageBlob);
            }).catch(error => console.log(error));


        return divCard;
    }

    let beersList = [];
    let pagina = 1;

    async function downloadBeers(pagina) {
        let resposta = await fetch(`https://api.punkapi.com/v2/beers?page=${pagina}&per_page=25`);
        let birres = await resposta.json();
        return birres;
    }

    function renderBeers(beers) {
        console.log(beers);
        let divBeerList = document.querySelector('#beerList');
        divBeerList.innerHTML = '';
        for (let b of beers) {
            divBeerList.append(renderBeerCard(b));
        }
    }

    async function loadBeers() {
        beersList = await downloadBeers(pagina);
        renderBeers(beersList);
    }

    function ordenar(criteri){
        sortedBeerList = beersList.sort((a,b) => b[criteri] > a[criteri]);
      //  console.log(sortedBeerList);
        renderBeers(sortedBeerList);
    }

    function paginar(increment){
        pagina += increment;
        loadBeers();
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadBeers();
        document.querySelector('#home').addEventListener('click', () => { loadBeers(); });
        document.querySelector('#oABV').addEventListener('click', () => { ordenar('abv'); });
        document.querySelector('#oIBU').addEventListener('click', () => { ordenar('ibu'); });
        document.querySelector('#oPH').addEventListener('click', () => { ordenar('ph'); });
        document.querySelector('#oEBC').addEventListener('click', () => { ordenar('ebc'); });


        document.querySelector('#anterior').addEventListener('click', () => { paginar(-1); });
        document.querySelector('#seguent').addEventListener('click', () => { paginar(1); });

    });
})();




function interseccio(A,B){

    function comparar(c1,c2){
        return c1[0] === c2[0] && c1[1] === c2[1]; 
    }

    EA = Object.entries(A);
    EB = Object.entries(B);

    let inter = Object.fromEntries(EA.filter(ea => EB.find(eb => comparar(ea,eb))));
    console.log(inter);

}

interseccio({a:1,b:2,c:3,d:5},{b:2,c:1,d:5});


function neteja(A){

    return A.filter(a => a);
   

}

console.log(neteja([1,2,3,0,null,undefined,NaN,false,"",4]));


function calculadora(array){
    return array.map(a => a.Op(a.a,a.b));
}

console.log(calculadora([{a:1,Op: (a,b) => a+b, b:3},{a:2,Op: (a,b) => a-b, b:10},{a:14,Op: (a,b) => a*b, b:3}]));

function positivos(array){
    return calculadora(array).filter(a => a > 0);
}

console.log(positivos([{a:1,Op: (a,b) => a+b, b:3},{a:2,Op: (a,b) => a-b, b:10},{a:14,Op: (a,b) => a*b, b:3}]));

function ordenarUltima(array){
    return positivos(array).sort((a,b)=>  a%10 - b%10 );
}

console.log(ordenarUltima([{a:1,Op: (a,b) => a+b, b:3},{a:2,Op: (a,b) => a-b, b:10},{a:14,Op: (a,b) => a*b, b:3}]));
