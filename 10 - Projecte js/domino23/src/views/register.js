import { registerUser } from '../services/users.js';

export { registerForm };

function registerForm() {
  const divLogin = document.createElement('div');
  divLogin.classList.add('formulari_centrat');
  divLogin.innerHTML = `  <form>
    <div class="mb-3">
      <label for="signupemail" class="form-label">Email address</label>
      <input type="email" class="form-control" id="signupemail" aria-describedby="emailHelp">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="signuppassword" class="form-label">Password</label>
      <input type="password" class="form-control" id="signuppassword">
      <label for="signuppassword2" class="form-label">Repeat Password</label>
      <input type="password" class="form-control" id="signuppassword2">
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="remember">
      <label class="form-check-label" for="remember">Remember</label>
    </div>
    <button type="submit" id="signupbtn" class="btn btn-primary">Submit</button>
    <div id="errors"></div>
    </form>`;

  divLogin.querySelector('#signupbtn').addEventListener('click', async (event) => {
    event.preventDefault();
    const email = divLogin.querySelector('#signupemail').value;
    const password = divLogin.querySelector('#signuppassword').value;
    const dataLogin = await registerUser(email, password);
    console.log(dataLogin);
  });

  return divLogin;
}
