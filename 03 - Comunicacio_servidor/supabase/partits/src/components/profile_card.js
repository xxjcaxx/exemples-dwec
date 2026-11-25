/*

Crear component de perfil amb la informació de l'usuari.
Crear un formulari per modificar la informació de l'usuari.
Descarregar la informació de l'usuari amb el token d'autenticació.
Fer en el servici una funció per fer PATCH a la taula d'usuari amb la informació modificada.

*/
import { patchTable, dowloadFile } from '../services/supaservice';

async function getUserAvatar(avatarUrl) {
    try {
        const avatarBlob = await dowloadFile('avatars', avatarUrl);
        return URL.createObjectURL(avatarBlob);
    } catch (error) {
        console.error("Error descarregant l'avatar de l'usuari:", error);
        return "avatarplaceholder.jpg";
    }
}

export function profileCard(user) {
    const template = `
    <div class="container">
    <div class="row justify-content-center">
        <div class="col-3">
        <img id="avatar" src="avatarplaceholder.jpg" alt="Avatar" class="img-fluid rounded-circle mb-3">
        <form id="profileForm">
            <div class="mb-3">
                <label for="username" class="form-label">Email address</label>
                <input name="username" type="text" class="form-control" id="username"  value="${user.username}">
            </div>
            <div class="mb-3">
                <label for="full_name" class="form-label">Full Name</label>
                <input name="full_name" type="text" class="form-control" id="full_name"  value="${user.full_name}">
            </div>
            <div class="mb-3">
                <label for="avatar_url" class="form-label">Avatar URL</label>
                <input name="avatar_url" type="text" class="form-control" id="avatar_url"  value="${user.avatar_url}">
            </div>
            <div class="mb-3">
                <label for="website" class="form-label">website</label>
                <input name="website" type="text" class="form-control" id="website"  value="${user.website}">
            </div>
            <button type="submit" class="btn btn-primary">Update Profile</button>
        </form>
       
        </div>
    </div>
    </div>
    `;
    const divForm = document.createElement('div');
    divForm.innerHTML = template;
    const profileForm = divForm.querySelector("#profileForm");
    const avatarImg = divForm.querySelector("#avatar");
    profileForm.addEventListener("submit", e => {
        e.preventDefault();
        const formData = new FormData(profileForm);
        const body = JSON.stringify(Object.fromEntries(formData));
        
        // Aquí cridaríem a la funció del servei per fer PATCH a la taula d'usuari amb la informació modificada.
        console.log("Dades enviades per modificar l'usuari:", body);
        patchTable("profiles", user.id, body)
            .then(updatedUser => {
                console.log("Usuari actualitzat:", updatedUser);
                // Actualitzar la interfície amb les noves dades si cal.
            })
            .catch(error => {
                console.error("Error actualitzant l'usuari:", error);
            });
    });


    // Descarregar l'avatar de l'usuari i actualitzar la imatge si hi ha un avatar_url.
    if (user.avatar_url) {
        getUserAvatar(user.avatar_url).then(avatarSrc => {
                        
            
            avatarImg.src = avatarSrc;
        });
    }

    return divForm.firstElementChild;
}
