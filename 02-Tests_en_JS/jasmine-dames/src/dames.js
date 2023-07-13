/**
 * El programa principal. Manté la gestió de l'estat
 */

import { createBoardTable } from "./DamesFunctions.js";

document.addEventListener("DOMContentLoaded",function dom() {

    const boardDiv = document.querySelector('#container');
    boardDiv.append(createBoardTable())

})