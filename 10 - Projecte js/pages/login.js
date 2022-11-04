export {loginForm};
import {loginUser} from "../services/users.js"

function loginForm(){

    let divLogin = document.createElement('div');
    divLogin.classList.add('formulari_centrat');

    divLogin.innerHTML = `  <form action="action_page.php" method="post">


    <div class="container">
      <label for="uname"><b>Username</b></label>
      <input
        type="text"
        placeholder="Enter Username"
        name="uname"
        required
        id="loginemail"
      />

      <label for="psw"><b>Password</b></label>
      <input
        type="password"
        placeholder="Enter Password"
        name="psw"
        required
        id="loginpassword"
      />

      <button class="login" type="button" id="loginbutton">Login</button>
      <label>
        <input type="checkbox" checked="checked" name="remember" />
        Remember me
      </label>
    </div>

    <div class="container" style="background-color: #f1f1f1">
      <button type="button" class="login cancelbtn">Cancel</button>
      <span class="psw">Forgot <a href="#">password?</a></span>
    </div>
  </form>`;

  divLogin.querySelector('#loginbutton').addEventListener('click', async ()=>{
    let email = divLogin.querySelector('#loginemail').value;
    let password = divLogin.querySelector('#loginpassword').value;
    let dataLogin = await loginUser(email,password);
    console.log(dataLogin);
  });

    return divLogin;

}