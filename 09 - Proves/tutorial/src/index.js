import './styles/styles.scss'
import * as bootstrap from 'bootstrap'

import {route} from "./router/router.js"
import { debounceTime, distinctUntilChanged, filter, map, fromEvent } from 'rxjs';
import { searchProducts } from './services/http';
  

    document.addEventListener('DOMContentLoaded', function main() {
        route(window.location.hash);
        window.addEventListener("hashchange",()=> route(window.location.hash));


        const searchValue$ = fromEvent(document.querySelector('#searchInput'),'keyup')
                                .pipe(
                                    map(e=> e.target.value),
                                    distinctUntilChanged(),
                                    debounceTime(300)
                                );
        searchValue$.subscribe(filtre => searchProducts(filtre));

       

    })
