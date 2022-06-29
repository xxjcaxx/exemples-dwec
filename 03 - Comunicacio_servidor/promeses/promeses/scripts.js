(() => {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("abans promesa");

    const promise = new Promise((resolve, reject) => {
      // Funció executor
      console.log("dins funcio executora");
      ///setTimeout(() => {
      /// Provar a comentar el stetimeout
      console.log("timeout");
      if (Math.random() > 0.5) {
        console.log("funciona");
        resolve("Resolving an asynchronous request!");
      } else {
        console.log("no funciona");
        reject("Rejecting an asynchronous request!");
      }
      // }, 0);
    });
    console.log("despres promesa");
    promise
      .then((response) => {
        //.then si resol
        console.log("Funciona! " + response);
      })
      .catch((response) => {
        // .catch si falla
        console.log("No funciona " + response);
      });
    console.log("despres cridada promesa");
  });
})();
