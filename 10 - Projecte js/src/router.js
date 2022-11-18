import { loginForm } from "./pages/login.js";
import { home } from "./pages/home.js";
import { registerForm } from "./pages/register.js";
import { logout } from "./services/users.js";
import { profileForm } from "./pages/profile.js";
import { detail } from "./pages/detail.js";
import { dataPage } from "./pages/data.js";

export { route };

function route(ruta) {

  console.log(ruta);
  let main = document.querySelector("#main");

  if (/#\/graph\/[0-9]+/.test(ruta)) {
    let graphID = ruta.split("/")[2];
    main.innerHTML = "";
    main.append(detail(graphID));
  }

  switch (ruta) {
    case "#/":
      main.innerHTML = "";
      main.append(home());
      break;
    case "#/login":
      main.innerHTML = "";
      main.append(loginForm());
      break;
    case "#/data":
        main.innerHTML = "";
        main.append(dataPage());
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
