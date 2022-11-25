import { getProfile, isLogged } from "../services/users.js";

export { menuTemplate };

function menuTemplate() {
  let menuDiv = document.createElement("div");
  menuDiv.id = "header";
  menuDiv.innerHTML = ` 
  <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Dashboarding</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/data">Data</a>
        </li>
      
      ${
        !isLogged()
          ? `
      <li class="nav-item">
      <a class="nav-link" href="#/login">Login</a>
    </li>
    `
          : ""
      }
    ${
      !isLogged()
        ? `
    <li class="nav-item">
    <a class="nav-link" href="#/register">Sign Up</a>
  </li>
  `
        : ""
    }
  ${
    isLogged()
      ? `
        <li class="nav-item">
          <a class="nav-link"  href="#/logout">Logout</a>
        </li>
        <li class="nav-item">
        <a class="nav-link"  href="#/profile">Profile</a>
      </li>
   
      <li class="nav-item">
        <a class="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img id="avatar_navbar" src="" width="30" height="30" class="rounded-circle">
        </a>
      </li>   
      `
      : ""
  }
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
  </nav>
  `;

  if (isLogged()){
    getProfile().then((dataProfile) => {
      dataProfile = dataProfile[0];
      console.log(dataProfile);
      menuDiv.querySelector("#avatar_navbar").src = dataProfile.avatar_blob;
    });
  }


  return menuDiv;
}
