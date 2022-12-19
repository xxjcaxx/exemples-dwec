import {route} from "./router/router.js"
  

    document.addEventListener('DOMContentLoaded', function main() {
        route(window.location.hash);
        window.addEventListener("hashchange",()=> route(window.location.hash))
    })
