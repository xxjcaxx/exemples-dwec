(function main(){

document.addEventListener('DOMContentLoaded', function DOMLoaded(){

    ////////////// Creació d'errors
    try {
        throw new Error('¡Ups!')
      } catch (e) {
        console.error(e.name + ': ' + e.message);
        console.error(e.toString());
      }
      

      //throw new Error('mal');
      //console.log(`Despŕes d'error`);

      ///////////// Errors específics

      try {
        foo.bar()
      } catch (e) {
        console.error(e.toString());
        if (e instanceof EvalError) {
          console.error(e.name + ': ' + e.message)
        } else if (e instanceof RangeError) {
          console.error(e.name + ': ' + e.message)
        }
        // ... etc
      }
      finally {
       // closeMyFile();
      }


      /////////// Sense errors
      let promesa1 = new Promise(function promesa(resolve,reject){
          Math.random() > 0.5 ? resolve('Funciona 1') : reject('No funciona 1'); 
      });

      promesa1.then(function r(message){ console.log(message);})
      .catch(function c(error){console.error(error);});

     /////// Errors dins de la promesa
     let promesa2 = new Promise(function promesa(resolve,reject){
         try {  
             if(Math.random() > 0.5) resolve('Funciona 2')
             else throw new Error('No funciona 2');
             }
             catch(error){
                reject(error.message);
             }
    });

    promesa2.then(function r(message){ console.log(message);})
    .catch(function c(error){console.error(error);});


    //////////////// Errors en els dos llocs:
    let promesa3 = new Promise(function promesa(resolve,reject){
        try {  
            if(Math.random() > 0.5) resolve('Funciona 3')
            else throw new Error('No funciona 3');
            }
            catch(error){
               reject(error.message);
            }
   });

 
   promesa3.then(function r(message){ console.log(message);})
   .catch(
       function c(error){
           throw new Error(error);
       }
       ).catch( function c(error){
           console.error(error.toString());
       })



});

}
)();