(() => {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("abans promesa");
    let mensaje = "";

    const promise = new Promise((resolve, reject) => {
      // Funció executor
      console.log("dins funcio executora");
      setTimeout(() => {
      /// Provar a comentar el settimeout
      console.log("timeout");
      if (Math.random() > 0.5) {
        console.log("funciona");
        mensaje = "Resolving....";
        resolve("Resolving an asynchronous request!");
      } else {
        console.log("no funciona");
        reject("Rejecting an asynchronous request!");
      }
       }, 0);
    });

    console.log("despres promesa");
    console.log(mensaje);
    promise
      .then((response)=>{ 
        console.log(mensaje);
        setTimeout(()=> console.log("sto dins then"),0);
        return response;
      })
      .then((response) => {
        //.then si resol
        console.log("Funciona! " + response);
      })
      .catch((response) => {
        // .catch si falla
        console.log("No funciona " + response);
      });
    console.log("despres cridada promesa");
    let i =0;
    while(i< 1e9){
      i++;
    }
    console.log("despres del while");
    console.log(mensaje);
  });
})();
