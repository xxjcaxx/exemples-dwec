document.addEventListener("DOMContentLoaded",()=>{

    let dins = document.querySelector('#quadrat_dins');
    let fora = document.querySelector('#quadrat');

    /*dins.addEventListener('click',function(event){ 
        console.log("Dins"); 
        event.stopPropagation();  
    });*/

    fora.addEventListener('click',function(event){ 
        if (event.target == dins){
            console.log("Dins");
        }
        else {
            console.log("Fora"); 
        }
       
    });

});
