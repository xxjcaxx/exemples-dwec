document.addEventListener("DOMContentLoaded", () => {
  /*
Fes en JS que quan fem click en el quadrat de dins sols 
escriga “DINS” per la consola i quan fem click en 
l’exterior escriga “FORA”. Sols pots utilitzar addEventListener i 
sols una vegada. 
*/
  let fora = document.querySelector("#quadrat");
  let dins = document.querySelector("#quadrat_dins");

  fora.addEventListener('click',(e) => {
    if (e.target === dins) {
        console.log('Dins');
    }
    if (e.target === fora) {
        console.log('Fora');
    }
    console.log('Click');
  });


 /* fora.addEventListener('click',(e) => {
        console.log('Fora');
  });
  dins.addEventListener('click',(e) => {
    console.log('Dins');
    e.stopPropagation();
});*/


});
