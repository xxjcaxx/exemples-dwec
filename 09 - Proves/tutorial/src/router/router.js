export {route};

import { getProducts, getQty, getReviews, searchReviews } from "../services/http.js";
import { reviewTemplate, reviewItemTemplate } from "../components/reviewItem/reviewItem.js";
import { itemList } from "../components/itemList/itemList.js";
import { productTemplate } from "../components/productItem/productItem.js";
import { generatePagination } from "../components/pagination/pagination.js";

const route = (ruta) => {
    console.log(ruta);
    let itemsContainer = document.querySelector("#items");
    let pagina = 0;

    if (/#\/[a-zA-Z]+\/page=[0-9]+/.test(ruta)) {
        pagina = ruta.split("/")[2].split('=')[1];
        ruta = '#/products'
      }


    switch(ruta){
        case "#/":
            itemsContainer.innerHTML = "Home";
            break;
        case "#/reviews":
            itemsContainer.innerHTML = "";
            getReviews().then(reviews => {
                let reviewsDivs = itemList(reviews,reviewTemplate);
                itemsContainer.append(...reviewsDivs);
            })
            break;
        case "#/products":
            itemsContainer.innerHTML = "";
            getProducts(pagina).then(products => {
                let productsDivs = itemList(products,productTemplate);
                itemsContainer.append(...productsDivs);
            })
            getQty('products').then(qty => 
                generatePagination(qty,10,parseInt(pagina),document.querySelector('#pagination')))
            break;
        case "":
            window.location.hash = '#/'
    }
}