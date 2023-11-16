import { loginUser, logout, forgotPassword } from '../services/users.js';

export { loginForm };

function loginForm() {
  const divLogin = document.createElement('div');
  divLogin.classList.add('formulari_centrat');

  divLogin.innerHTML = `  <form>
  <div class="mb-3">
    <label for="loginpassword" class="form-label">Email address</label>
    <input type="email" class="form-control" id="loginemail" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="loginpassword" class="form-label">Password</label>
    <input type="password" class="form-control" id="loginpassword">
  </div>
  <a href="#" id="forgotPassword">I forgot my password</a>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="remember">
    <label class="form-check-label" for="remember">Remember</label>
  </div>
  <button type="submit" id="loginbutton" class="btn btn-primary">Submit</button>
  <div id="errors"></div>
  </form>`;

  divLogin.querySelector('#loginbutton').addEventListener('click', async (event) => {
    event.preventDefault();
    const email = divLogin.querySelector('#loginemail').value;
    const password = divLogin.querySelector('#loginpassword').value;
    loginUser(email, password).then((status) => {
      if (status.success) window.location.hash = '#/';
      else {
        divLogin.querySelector('#errors').innerHTML = status.errorText;
      }
    });
  });

  divLogin.querySelector('#forgotPassword').addEventListener('click', (event) => {
    event.preventDefault();
    const email = divLogin.querySelector('#loginemail').value;
    forgotPassword(email);
    event.target.parentElement.append('You have an Email');
  });

  return divLogin;
}
