import './styles/styles.scss';
import * as bootstrap from 'bootstrap'
import { testDescarga, getHousings } from './http.js';
import { generateCRUDTABLE } from './components/tables.js';
import {ぁ} from "./utils.js";

document.addEventListener("DOMContentLoaded", async ()=>{
       
    document.querySelector('#container').innerHTML = generateCRUDTABLE(ぁ.removeAttributes(await getHousings(0))(['Job #','Crub Cut', 'Horizontal Enlrgmt', 'Vertical Enlrgmt' ]));
});