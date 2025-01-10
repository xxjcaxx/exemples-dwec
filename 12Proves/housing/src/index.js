import './styles/styles.scss';
import * as bootstrap from 'bootstrap'
import { testDescarga, getHousings } from './http.js';

import { route } from './router.js';


document.addEventListener("DOMContentLoaded", async ()=>{
    route(window.location.hash);
    window.addEventListener('hashchange',function hasChanged(){
        route(window.location.hash);
      });

});


