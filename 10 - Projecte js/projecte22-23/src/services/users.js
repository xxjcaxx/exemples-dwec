import { loginSupabase, signUpSupabase, logoutSupabase, recoverPasswordSupabase, updateData, createData, getData, fileRequest, getFileRequest } from "./http.js";

export { loginUser, isLogged, registerUser, logout,updateProfile, getProfile, forgotPassword, loginWithToken };

function expirationDate(expires_in){
    return Math.floor(Date.now() / 1000)+expires_in; 
        localStorage.setItem("expirationDate",expirationDate);
}

async function loginUser(email, password) {
    let status = { success: false };
    try {
        let dataLogin = await loginSupabase(email, password);
        console.log(dataLogin);
        localStorage.setItem("access_token", dataLogin.access_token);
        localStorage.setItem("uid", dataLogin.user.id);
        localStorage.setItem("expirationDate",expirationDate(dataLogin.expires_in));
        status.success = true;
    }
    catch (err) {
        console.log(err);
        status.success = false;
        status.errorText = err.error_description;
    }

    return status;
}

function loginWithToken(access_token,expires_in){
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("expirationDate",expirationDate(expires_in));
}

function isLogged(){
    if(localStorage.getItem('access_token')){
        if(localStorage.getItem('expirationDate') > Math.floor(Date.now() / 1000))
        {
            return true;
        }
    }
    return false;
}

function registerUser(email, password) {
    let status = { success: false };
    try {
        signUpSupabase(email, password).then(dataRegister => {
            console.log(dataRegister);
            status.success = true;
        })
    }
    catch (err) {
        console.log(err);
        status.success = false;
        status.errorText = err.error_description;
    }
    return status;
}

function logout() {
    logoutSupabase(localStorage.getItem('access_token')).then(lOData => {
        console.log(lOData);
        localStorage.removeItem('access_token');
    });

}


async function updateProfile(profile){

    let access_token = localStorage.getItem('access_token');
    let uid = localStorage.getItem('uid');

    let formImg = new FormData();
    formImg.append("avatar", profile.avatar, 'avatarProfile.png');
    
    console.log(formImg);

    let avatarResponse = await fileRequest(`/storage/v1/object/avatars/avatar${uid}.png`,formImg,access_token)

   // console.log(avatarResponse);
    profile.avatar_url = avatarResponse.urlAvatar;
    delete profile.avatar;

    let responseUpdate = await updateData(`profiles?id=eq.${uid}&select=*`,access_token,profile);
   // console.log(responseUpdate);
   //createData('profiles',access_token,profile);

}

async function getProfile(){

    let access_token = localStorage.getItem('access_token');
    let uid = localStorage.getItem('uid');
    let responseGet = await getData(`profiles?id=eq.${uid}&select=*`,access_token);
    console.log(responseGet);
    let avatar_url = responseGet[0].avatar_url;
    responseGet[0].avatar_blob = false;
    if (avatar_url){
        let imageBlob = await getFileRequest(avatar_url,access_token);
        console.log(imageBlob);
        if(imageBlob instanceof Blob){
            responseGet[0].avatar_blob =  URL.createObjectURL( imageBlob );
        }
    }
    
    
    return responseGet;
 
}


async function forgotPassword(email){
    let responseForgot = await recoverPasswordSupabase(email);
    console.log(responseForgot);
}