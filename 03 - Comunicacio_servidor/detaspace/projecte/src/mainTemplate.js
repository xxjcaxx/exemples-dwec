export function getMainTemplate(){
    return `

        <div id="container">
          <div id="left">
            <div id="signup-container">
              <form action="action_page.php" style="border: 1px solid #ccc">
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
                    <button type="button" class="btn btn-success " id="signupbtn">Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
    
            <div id="login-container">
              <form action="action_page.php" method="post">
                <div class="imgcontainer">
                  <img src="img_avatar2.png" alt="Avatar" class="avatar" />
                </div>
    
                <div class="container">
                  <label for="uname"><b>Email</b></label>
                  <input
                    type="text"
                    placeholder="Enter email"
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
    
                  <button type="button" id="loginbutton" class="btn btn-success ">Login</button>
                  <label>
                    <input type="checkbox" checked="checked" name="remember" />
                    Remember me
                  </label>
                </div>
    
                
              </form>
            </div>
          </div>
          <div id="right">
            <div id="userInfo"></div>
            <button id="pedirDatos" class=" btn btn-success">Pedir datos</button>
            <div id="datosServidor">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat
                maiores tempore labore a aperiam, veniam totam nam illum quae rerum enim
                omnis eveniet debitis nobis magni officia voluptate hic ipsam.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat
                maiores tempore labore a aperiam, veniam totam nam illum quae rerum enim
                omnis eveniet debitis nobis magni officia voluptate hic ipsam.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat
                maiores tempore labore a aperiam, veniam totam nam illum quae rerum enim
                omnis eveniet debitis nobis magni officia voluptate hic ipsam.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat
                maiores tempore labore a aperiam, veniam totam nam illum quae rerum enim
                omnis eveniet debitis nobis magni officia voluptate hic ipsam.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat
                maiores tempore labore a aperiam, veniam totam nam illum quae rerum enim
                omnis eveniet debitis nobis magni officia voluptate hic ipsam.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat
                maiores tempore labore a aperiam, veniam totam nam illum quae rerum enim
                omnis eveniet debitis nobis magni officia voluptate hic ipsam.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat
                maiores tempore labore a aperiam, veniam totam nam illum quae rerum enim
                omnis eveniet debitis nobis magni officia voluptate hic ipsam.
            </div>
          
          </div>
        </div>

    
    `;
}