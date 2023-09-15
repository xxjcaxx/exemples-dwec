// Import our custom CSS
import './scss/styles.scss'
import './scss/style.css'
import placeHolderImg from './images/graphPlaceholder.png'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


import {menuTemplate} from "./views/menu.js";

import {generateFooter} from "./views/footer.js"
import  {loginForm} from "./pages/login.js"
import {route} from "./router.js"



(() => {
  document.addEventListener("DOMContentLoaded", () => {
    let container = document.querySelector("#container");
    container.append(menuTemplate());
    let mainWindow = document.createElement("div");
    mainWindow.id = "main";
    mainWindow.classList.add("container");
    container.append(mainWindow);
   
    route(window.location.hash);

    container.append(generateFooter());

    window.addEventListener('hashchange',function hasChanged(){
      route(window.location.hash);
    });



  
  });
})();
