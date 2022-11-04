import { loginForm } from "./pages/login.js";
import { home } from "./pages/home.js";
import { registerForm } from "./pages/register.js";

export { route };

function route(ruta) {
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
    case "":
      window.location.hash = "#/";
      break;
  }
}
