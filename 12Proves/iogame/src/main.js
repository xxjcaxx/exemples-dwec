import "./style.scss"

//import * as bootstrap from 'bootstrap'

import { renderHeader } from "./components/header"
import { renderContent } from "./components/content";
import { renderFooter } from "./components/footer";

document.addEventListener("DOMContentLoaded",()=>{
  const appDiv = document.querySelector('#app');
  appDiv.innerHTML = renderHeader()+renderContent()+renderFooter();
});