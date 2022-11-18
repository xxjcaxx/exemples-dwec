export {dataPage};
  import { getData } from "../services/http.js";
import {generateGraphCard} from "../views/cards.js"
import {generateTable} from "../views/tables.js"

function dataPage(){
    let mainWindowRow = document.createElement("div");
    mainWindowRow.classList.add("row", "gx-2", "gy-2", "row-cols-1");

  
    if(localStorage.getItem('access_token')){
      getData('graphs',localStorage.getItem('access_token'))
      .then(d => {
        console.log(d);
        for (let g of d) {
          mainWindowRow.append(generateTable(g));
        }
      });
    }
    else{
      mainWindowRow.innerHTML= "<p>Please, login<p>";
    }



      return mainWindowRow;
}