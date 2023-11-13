import { loginForm } from './views/login.js';
import { home } from './views/home.js';
import { registerForm } from './views/register.js';
import { generateGame } from './gameViews/gameViews.js';
/* import { loginWithToken, logout } from "./services/users.js";
import { profileForm } from "./pages/profile.js";
import { detail } from "./pages/detail.js";
import { dataPage } from "./pages/data.js"; */

export { route };

function route(ruta) {
  console.log(ruta);
  let params = ruta.split('?')[1];
  ruta = ruta.split('?')[0];
  const main = document.querySelector('#container');

  switch (ruta) {
    case '#/':
      main.innerHTML = '';
      main.append(home());
      break;
    case '#/login':
      main.innerHTML = '';
      main.append(loginForm());
      break;
    case '#/game':
      main.innerHTML = '';
      generateGame(4).then((divs) =>  main.append(...divs));
      break;
    case '#/register':
      main.innerHTML = '';
      main.append(registerForm());
      break;
    case '#/logout':
      logout();
      window.location.hash = '#/';
      break;
    case '#/profile':
      main.innerHTML = '';
      main.append(profileForm());
      break;
    case '':
      window.location.hash = '#/';
      break;
  }
}
