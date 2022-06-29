(() => {
  document.addEventListener("DOMContentLoaded", () => {


    /* Construim un array de números aleatoris */
    const temps = Array(40).fill().map(() => Math.round(Math.random() * 2000));
    const contingut = document.querySelector('#contingut');
    console.log(temps);

    /*  L'objectiu és fer que aparega el número la quantitat de milisegons que diu */

    /* Amb aquesta solució creem una espècie de comptador, però no espera a cadascun */
    /* for (let n of temps) {
       setTimeout(() => {
         let numero = document.createElement('h2');
         numero.innerHTML = n;
         contingut.innerHTML = '';
         contingut.append(numero);
       }, n);
     }*/

    /* Solució amb reduce i promeses */

  /*  temps.reduce((anterior, actual) => {
      console.log(anterior, actual);
      return anterior.then((n) => new Promise((resolve) => {
        setTimeout(() => {
          let numero = document.createElement('h2');
          numero.innerHTML = actual;
          contingut.innerHTML = '';
          contingut.append(numero);
          resolve(actual);
        }, n);

      }));
    }, Promise.resolve(0));
*/



  /* Solució amb async await */


   /* async function mostrar(arrayTemps){
     for(let n of arrayTemps){
       await new Promise((r)=>{
        let numero = document.createElement('h2');
        numero.innerHTML = n;
        contingut.innerHTML = '';
        contingut.append(numero);
        setTimeout(() => {
          r();
        }, n);
       });
     }
    }
    
        mostrar(temps);

    */


     /* Solució amb async await i reduce (en map no es pot perquè ho fa parallel sempre)*/

     async function mostrar(arrayTemps){
      

      arrayTemps.reduce(async (anterior,actual)=>{
        console.log(anterior,actual);
        await new Promise((r)=>{
          setTimeout(() => {
            r();
          }, anterior);
         }).then(()=>{
          let numero = document.createElement('h2');
          numero.innerHTML = actual;
          contingut.innerHTML = '';
          contingut.append(numero);
         });
      },0);

       
      




     }

    mostrar(temps);



  });
})();

