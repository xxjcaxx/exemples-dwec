export {productTemplate};

import { getProducts, getReviews, searchReviews } from "../../services/http.js";
import { reviewTemplate, reviewItemTemplate } from "../../components/reviewItem/reviewItem.js";
import { itemList } from "../../components/itemList/itemList.js";

const productTemplate = (product) => {
    let div = document.createElement('div');
    div.classList.add('col');
    div.id = product.asin;
    div.innerHTML = `  
        <div class="card" style="width: 18rem">
        <img class="card-img-top"  src="https://bqhnvwfovmcxrqrsmfxr.supabase.co/storage/v1/object/public/products/${product.asin}.jpg">
        <div class="card-body">
            <h5 class="card-title">${product.asin}</h5>
            
        </div>
        <div class="accordion"></div>
        </div>
        `;

      
        let reviews = searchReviews(product.asin);
        reviews.then(revs => {
              let reviewsDivs =  itemList(revs,reviewItemTemplate);
              div.querySelector('div.accordion').append(...reviewsDivs)
            })
        
    return div;
}
