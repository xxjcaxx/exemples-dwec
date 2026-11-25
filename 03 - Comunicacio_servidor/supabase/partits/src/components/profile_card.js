/*

Crear component de perfil amb la informació de l'usuari.
Crear un formulari per modificar la informació de l'usuari.
Descarregar la informació de l'usuari amb el token d'autenticació.
Fer en el servici una funció per fer PATCH a la taula d'usuari amb la informació modificada.

*/

export function profileCard(user) {
    const template = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
                <p class="card-text">${user.email}</p>
            </div>
        </div>
    `;
    return template;
}