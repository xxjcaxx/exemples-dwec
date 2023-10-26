import { loginForm } from "./views/login.js";
import { home } from "./views/home.js";
import { registerForm } from "./views/register.js";
import { generateGame } from "./gameViews/gameViews.js";
/*import { loginWithToken, logout } from "./services/users.js";
import { profileForm } from "./pages/profile.js";
import { detail } from "./pages/detail.js";
import { dataPage } from "./pages/data.js";*/

export { route };

function route(ruta) {

  console.log(ruta);
  let main = document.querySelector("#container");

  if (/#\/graph\/[0-9]+/.test(ruta)) {
    let graphID = ruta.split("/")[2];
    main.innerHTML = "";
    main.append(detail(graphID));
  }
  else if(/#access_token=.*type=recovery$/.test(ruta)) {
    let datos = Object.fromEntries(ruta.substring(1).split('&').map(parametro => parametro.split('=')));
    loginWithToken(datos['access_token'],datos.expires_in);
    window.location.hash = "#/";
    
  }

  else {
    switch (ruta) {
      case "#/":
        main.innerHTML = "";
        main.append(home());
        break;
      case "#/login":
        main.innerHTML = "";
        main.append(loginForm());
        break;
      case "#/game":
          main.innerHTML = "";
          main.append(generateGame());
          break;
      case "#/register":
        main.innerHTML = "";
        main.append(registerForm());
        break;
      case "#/logout":
          logout();
          window.location.hash = "#/";
          break;
          case "#/profile":
            main.innerHTML = "";
        main.append(profileForm());
            break;
      case "":
        window.location.hash = "#/";
        break;
    }
  }


}