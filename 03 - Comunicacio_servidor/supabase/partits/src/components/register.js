export {registerCard}

import { register } from "../services/supaservice";

function registerCard() {

   const  template =  `
  <form id="registerForm">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We’ll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input name="password" type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="mb-3 form-field">
    <input type="checkbox" id="exampleCheck1" class="check">
    <label for="exampleCheck1">Check me out</label>
  </div>
  <button id="registerButton" class="btn-solid theme-primary">Submit</button>
</form>
  `;
  const divForm = document.createElement('div');
  divForm.innerHTML = template;
  const registerButton = divForm.querySelector("#registerButton");
  const formulari = divForm.querySelector('#registerForm');

  registerButton.addEventListener("click",e =>{
    e.preventDefault();
    const registerData = new FormData(formulari);
    let body = JSON.stringify(Object.fromEntries(registerData));
    
    register(body);
  });
  
  return divForm.firstElementChild
}
