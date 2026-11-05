import './style.scss'
import * as bootstrap from "bootstrap";
import {getTable} from "./services/supaservice"
import {partitCard} from "./components/partit_card"
import { registerCard } from './components/register';

document.addEventListener("DOMContentLoaded",()=>{

  const partitsContainer = document.createElement("div");
  partitsContainer.className = "container row g-3 mt-3";
  document.querySelector("#app").append(partitsContainer);

  getTable("partits").then((partits)=>{
    partitsContainer.innerHTML = partits.map(partitCard).join('');
  });

  const registerDiv = document.querySelector("#register");
  registerDiv.append(registerCard());

});