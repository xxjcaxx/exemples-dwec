export {registerForm};
import {registerUser} from "../services/users.js"

function registerForm(){

    let divLogin = document.createElement('div');
    divLogin.classList.add('formulari_centrat');
    divLogin.innerHTML = `        <form action="action_page.php" style="border: 1px solid #ccc">
    <div class="container">
      <h1>Sign Up</h1>
      <p>Please fill in this form to create an account.</p>
      <hr />

      <label for="email"><b>Email</b></label>
      <input
        id="signupemail"
        type="text"
        placeholder="Enter Email"
        name="email"
        required
      />

      <label for="psw"><b>Password</b></label>
      <input
        type="password"
        id="signuppassword"
        placeholder="Enter Password"
        name="psw"
        required
      />

      <label for="psw-repeat"><b>Repeat Password</b></label>
      <input
        type="password"
        placeholder="Repeat Password"
        name="psw-repeat"
        required
      />

      <label>
        <input
          type="checkbox"
          checked="checked"
          name="remember"
          style="margin-bottom: 15px"
        />
        Remember me
      </label>

      <p>
        By creating an account you agree to our
        <a href="#" style="color: dodgerblue">Terms & Privacy</a>.
      </p>

      <div class="clearfix">
        <button type="button" class="cancelbtn login">Cancel</button>
        <button type="button" class="signupbtn login" id="signupbtn">Sign Up</button>
      </div>
    </div>
  </form>`;

  divLogin.querySelector('#signupbtn').addEventListener('click', async ()=>{
    let email = divLogin.querySelector('#signupemail').value;
    let password = divLogin.querySelector('#signuppassword').value;
    let dataLogin = await registerUser(email,password);
    console.log(dataLogin);
  });

    return divLogin;

}