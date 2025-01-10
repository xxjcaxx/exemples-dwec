import { loginUser, registerUser } from "../http.js";

export const generateRegisterForm = () => {

    let registerForm = document.createElement('main');
    registerForm.classList.add('form-signin', 'w-50', 'm-auto');

    registerForm.innerHTML = `
  <form>
    
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInputEmail" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>
    <div class="form-floating">
    <input type="password" class="form-control" id="floatingPassword2" placeholder="Password2">
    <label for="floatingPassword2">Password2</label>
  </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit" id="registerButton">Register</button>
    <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
  </form>
    `;

    let emailInput = registerForm.querySelector('#floatingInputEmail');
    let passwordInput = registerForm.querySelector('#floatingPassword');

    registerForm.querySelector('#registerButton').addEventListener('click', async (event)=>{
        event.preventDefault();
            let registerResponse = await registerUser({email: emailInput.value, password: passwordInput.value});
            console.log(registerResponse);

    })


    return registerForm;

}

export const generateLoginForm = () => {
    let loginForm = document.createElement('main');
    loginForm.classList.add('form-signin', 'w-50', 'm-auto');

    loginForm.innerHTML = `
  <form>
    <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInputEmail" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit" id="loginButton">Sign in</button>
    <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
  </form>
    `;
    let emailInput = loginForm.querySelector('#floatingInputEmail');
    let passwordInput = loginForm.querySelector('#floatingPassword');

    loginForm.querySelector('#loginButton').addEventListener('click',(event)=>{
        event.preventDefault();
            loginUser({email: emailInput.value, password: passwordInput.value})

    })

    return loginForm;

}