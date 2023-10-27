(() => {
  document.addEventListener("DOMContentLoaded", () => {
    /// En timeouts
    /*
    setTimeout(() => {
      console.log(1);
    }, Math.random() * 1000);

    setTimeout(() => {
      console.log(2);
    }, Math.random() * 1000);

    setTimeout(() => {
      console.log(3);
    }, Math.random() * 1000);

    setTimeout(() => {
      console.log(4);
    }, Math.random() * 1000);
*/
    // Fer que escriga 1, 2, 3 ,4

    //////////// En callbacks
/*
    logTimeout = () => {
      setTimeout(() => {
        console.log(1);
        setTimeout(() => {
          console.log(2);
          setTimeout(() => {
            console.log(3);
            setTimeout(() => {
              console.log(4);
            }, Math.random() * 1000);
          }, Math.random() * 1000);
        }, Math.random() * 1000);
      }, Math.random() * 1000);
    };

    logTimeout();
*/
    //// En promeses  https://javascript.info/promise-chaining

    function promesaRandom(n) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(n);
          resolve(n);
        }, Math.random() * 1000);
      });
    }
/*
     promesaRandom(1)
      .then((n) => {
        console.log(n);
        return promesaRandom(2);
      })
      .then((n) => {
        console.log(n);
        return promesaRandom(3);
      })
      .then((n) => {
        console.log(n);
        return promesaRandom(4);
      })
      .then((n) => {
        console.log(n);
      });

  */

      
  /*  Promise.all([
      promesaRandom(1),
      promesaRandom(2),
      promesaRandom(3),
      promesaRandom(4),
    ]).then((n) => console.log(n));*/

  
    async function encadenarPromeses(n){
      for(let i=1; i<=n;i++){
        await promesaRandom(i);
      }
    }

    encadenarPromeses(4);

  });
})();
