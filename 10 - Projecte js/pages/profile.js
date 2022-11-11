import { updateProfile } from "../services/users.js";

export {profileForm};



function profileForm(){

    let dataProfile = JSON.parse(localStorage.getItem('dataProfile'));

    let divLogin = document.createElement('div');
    divLogin.classList.add('formulari_centrat');
    divLogin.innerHTML = `<form action="action_page.php" id="formProfile" style="border: 1px solid #ccc">
    <div class="container">
      <h1>Profile</h1>
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
      <button type="button" class="signupbtn login" id="chgpass">Change Password</button>

      <label for="username"><b>Username</b></label>
      <input
        type="text"
        placeholder="user name"
        name="username"
        id = "username"
        value = "${dataProfile.username}"
      />

      <label for="fullname"><b>Full Name</b></label>
      <input
        type="text"
        placeholder="fullname"
        name="full_name"
        value = "${dataProfile.full_name}"
      />


      <label for="web"><b>Web Site</b></label>
      <input
        type="text"
        placeholder="web"
        name="website"
        value = "${dataProfile.website}"
      />
  
      <img id="avatar_prev" src="${dataProfile.avatar_url}"/>

      <label for="avatar"><b>Avatar</b></label>
      <input
        type="file"
        id="avatar"
        name="avatar"
      />
  




      <div class="clearfix">

        <button type="button" class="signupbtn login" id="update">Update Profile</button>
      </div>
    </div>
  </form>`;

  divLogin.querySelector('#update').addEventListener('click', async ()=>{
  


    let formData = new FormData(divLogin.querySelector("#formProfile"));
    let {username, full_name, website} = Object.fromEntries(formData);
  
    console.log({username, full_name, website});
    let dataUpdate = await updateProfile({username,full_name,website});
    



  });

  function encodeImageFileAsURL(element) {
    var file = element.files[0];
    if(file) {
        divLogin.querySelector('#avatar_prev').src = URL.createObjectURL(file);
    }
    /*
    var reader = new FileReader();
    reader.onloadend = function() {
      console.log('RESULT', reader.result)
    }
    reader.readAsDataURL(file);*/
   }
   

  divLogin.querySelector('#avatar').addEventListener('change',function () {encodeImageFileAsURL(this)})

    return divLogin;

}