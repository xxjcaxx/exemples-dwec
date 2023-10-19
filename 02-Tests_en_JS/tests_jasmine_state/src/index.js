let state = 0;
//1 Qué passa si canvie el nom d'aquesta variable?


document.addEventListener("DOMContentLoaded",()=>{

    const incrementarBtn = document.querySelector('#incrementar');
    const decrementarBtn =document.querySelector('#decrementar');

    const estatDiv =document.querySelector('#estat');

    function incrementar(){
    state = parseInt(estatDiv.innerText);  //2 Qué passa si l'usuari modifica manualment el número
    state ++;
   // estatDiv.innerText = state;  //7 Què passa si vull modificar un altre div també o ja no el vull modificar?
  /*  setTimeout(() => {
        estatDiv.innerText = state; // 8 Si passen coses asíncrones pot fallar. La solució són les promeses que ja vorem. 
    }, 1000); */
    }

    function decrementar(){  //3 Cóm puc reutilitzar aquesta funció per decrementar un altre número
        state = state -1;
        estatDiv.innerText = state;
    }
    // 4 Cóm puc fer un test de incrementar i decrementar? Cóm les puc exportar?
    // 5 Cóm puc separar incrementar i decrementar de dins de la funció del DOMContentLoaded? 
    // 6 Cóm puc ficar incrementar i decrementar en un altre fitxer i importar-les?

    incrementarBtn.addEventListener('click',()=> incrementar());
    decrementarBtn.addEventListener('click',() =>decrementar());

})




let state2 = [2,3,5,1,0];
let max = 0;  // 10 ús de 2 variables per a l'estat

///// Funció per aconseguir el primer valor de l'estat original
function first(){  // 12 Imaginem que volem reutilitzar aquesta funció per a altres arrays
    return state2[0];
}

console.log({max, state2,first :first()});

// Funció per obtindre el màxim de l'estat original
function getMax(){
    let sorted = state2.sort((a,b)=> a > b ? -1 : 1);  // 9 Ja hem perdut l'ordre original
    max = sorted[0];
}

getMax();

console.log({max, state2,first :first()});  // 11 suposem que la variable max ja no la necessitem més i la tenim com a global

//// Funció per aconseguir un array amb la suma incremental de cada element de l'estat original.
function sumarIncremental() {
    return state2.reduce((previous,current,index)=> { 
        state2[index] = state2[index]  + previous;  // 12 No té sentit, però estic modifican el stat en el callback de reduce
        return state2[index];
    },0)
}

let sumaTotal = sumarIncremental();
getMax(); // 13 Executem ací getMax 


console.log({max, state2,first : first(),sumaTotal}); 