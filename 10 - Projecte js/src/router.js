import { loginForm } from "./pages/login.js";
import { home } from "./pages/home.js";
import { registerForm } from "./pages/register.js";
import { logout } from "./services/users.js";
import { profileForm } from "./pages/profile.js";

export { route };

function route(ruta) {

  if (/#\/link\/.*/.test(route)) {
    console.log('Link');
  }


  console.log(ruta);
  let main = document.querySelector("#main");
  switch (ruta) {
    case "#/":
      main.innerHTML = "";
      main.append(home());
      break;
    case "#/login":
      main.innerHTML = "";
      main.append(loginForm());
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
