import { home } from "./pages/home.js";
import { generateRegisterForm,generateLoginForm } from "./components/forms.js";
export { route };

function route(ruta) {

  console.log(ruta);
  let main = document.querySelector("#container");
 
    switch (ruta) {
      case "#/":
        main.innerHTML = "";
        home(main);
        break;
      case "#/login":
        main.innerHTML = "";
        main.append(generateLoginForm());
        break;
      case "#/register":
        main.innerHTML = "";
        main.append(generateRegisterForm());
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
