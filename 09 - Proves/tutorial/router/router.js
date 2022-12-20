export {route};

import { getProducts, getReviews } from "../services/http.js";
import { reviewTemplate } from "../components/reviewItem/reviewItem.js";
import { itemList } from "../components/itemList/itemList.js";
import { productTemplate } from "../components/productItem/productItem.js";

const route = (ruta) => {
    console.log(ruta);
    let itemsContainer = document.querySelector("#items");

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
            getProducts().then(products => {
                let productsDivs = itemList(products,productTemplate);
                itemsContainer.append(...productsDivs);
            })
            break;
        case "":
            window.location.hash = '#/'
    }
}