(() => {
  document.addEventListener("DOMContentLoaded", () => {
    let resultats = document.querySelector("#resultats");
    let user = document.querySelector("#user");

    if (localStorage.getItem("idToken")) {
      user.innerHTML = `Logged: ${localStorage.getItem("email")}`;
    }

    // Enviar registre d'usuaris
    document
      .querySelector("#formRegistre")
      .addEventListener("submit", function (event) {
        // Primer a formData, despres a objecte i despres a JSON
        // fromEntries funciona perquè formData és un iterable
        let datosFormData = new FormData(this);
        let objecteFormData = Object.fromEntries(datosFormData);
        objecteFormData.returnSecureToken = true;
        delete objecteFormData.remember;
        let datos = JSON.stringify(objecteFormData);
        console.log(datos);
        event.preventDefault();
        //console.log(this);
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACuNiwMT6WhLvr9G6HbMVhV4LfNFnAKzU",
          {
            method: "post",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: datos,
          }
        )
          .then((response) => {
            if (response.ok) return response.json();
            // else throw Error(response.statusText);
            else {
              return response.json().then((text) => {
                console.log(text);
                throw new Error(text.error.message);
              });
            }
          })
          .then((datos) => {
            resultats.innerHTML = JSON.stringify(datos);
            console.log(datos);
          })
          .catch((error) => {
            console.error("Error;", error);
            resultats.innerHTML = error;
          });
      });

    /// Login  //////////////

    document
      .querySelector("#formLogin")
      .addEventListener("submit", function (event) {
        // Primer a formData, despres a objecte i despres a JSON
        // fromEntries funciona perquè formData és un iterable
        let datosFormData = new FormData(this);
        let objecteFormData = Object.fromEntries(datosFormData);
        objecteFormData.returnSecureToken = true;
        delete objecteFormData.remember;
        let datos = JSON.stringify(objecteFormData);
        console.log(datos);
        event.preventDefault();
        //console.log(this);
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACuNiwMT6WhLvr9G6HbMVhV4LfNFnAKzU",
          {
            method: "post",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: datos,
          }
        )
          .then((response) => {
            if (response.ok) return response.json();
            // else throw Error(response.statusText);
            else {
              return response.json().then((text) => {
                console.log(text);
                throw new Error(text.error.message);
              });
            }
          })
          .then((datos) => {
            resultats.innerHTML = JSON.stringify(datos);
            user.innerHTML = `Login: ${datos.email}`;

            localStorage.setItem("idToken", datos.idToken);
            localStorage.setItem("email", datos.email);

            console.log(datos);
          })
          .catch((error) => {
            console.error("Error;", error);
            resultats.innerHTML = error;
          });
      });

    document.querySelector("#obtindre").addEventListener("click", () => {
      let token = localStorage.getItem("idToken");
      fetch(
        `https://dwec-daw-default-rtdb.firebaseio.com/productos.json?auth=${token}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => (resultats.innerHTML = JSON.stringify(data)));
    });
  }); //del load
})();
