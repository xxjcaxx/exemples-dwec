// Fes que el formulari no envie per defecte i que no valide per ell mateix. 

document.addEventListener('DOMContentLoaded',()=>{
    let form = document.querySelector('form');
   /* form.addEventListener('submit',(event)=>{
     //   event.preventDefault();
    });*/
    let buttonSubmit = form.querySelector('[type~="submit"]');
    buttonSubmit.addEventListener('click',(event) => {
        event.preventDefault(); 
          // Fes la validació del formulari aprofitant les etiquetes que ja té l'HTML i validant també per expressions regulars
          let valid = true;
          let lengthRegExp = /^.{2}/;

          let nameEnglish = form.querySelector('#name_english');
          if (!lengthRegExp.test(nameEnglish.value)) { 
            valid = false 
            // En cas de no validar, canvia la classe i el css per a que es mostre en roig el input. Un input no tocat no té que mostrar el color roig

            nameEnglish.classList.add('invalid');
        };

          if(valid){
            form.submit();
          }

    })
  


})



// Si tot el formulari valida, afegeix la info a un array de pokemons i mostra tot l'array a continuació del formulari. 

// Deshabilita el botó si el formulari no és valid. 