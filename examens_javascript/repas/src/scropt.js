async function descargar(url){
    let response = await fetch(url);
    let datos = await response.json();
      return datos;
}

descargar("datos.json").then(datos => {

    let diferenciaTemp = datos.map(mes=>{
        return { 
            month: mes.month, 
            dif: parseInt(mes.maxTemp) - parseInt(mes.minTemp) 
        }
    });

    console.log(diferenciaTemp);

    let avgRain = datos.reduce((acumulador,mesActual)=> 
                    acumulador+ parseFloat(mesActual.rainfall),0)/datos.length

    console.log(avgRain);

});

function suma(a,b) {
    return a+b;
}

