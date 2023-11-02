export {createArray,unFlat,uniqueValues,cartesianProduct,innerJoin,leftJoin};

/* Anem a crear una biblioteca d'utilitats per treballar en arrays 

Cal fer tots els tests

*/

///// 1 Una funció que retorna un array amb una longitut determinada i amb els 
///seus elements generats per una funció. 
///Aquesta funció generadora rep com a arguments: L'array sencer i l'índex.
/*function createArray(length, generatorFunction) {
    let result = Array(length)
    for(let i =0; i< length; i++){
        result[i]=(generatorFunction(result,i));
    }
    return result;
}*/
function createArray(length, generatorFunction) {
    let result = Array(length).fill(null);
    return result.map((e,i) => generatorFunction(result,i));
}

///// 2 Una funció per fer el contrari que flat(), 
//aquesta rep l'array i la mida per la que dividir-ho per retornar 
// un array bidimensional.
/*function unFlat(array,chunk){
    let result = [];
    let row = [];
    for(let i=0; i< array.length; i++){
        if(i % chunk == 0 && i > 0){ 
        result.push(row); 
        row = []; 
        } 
        row.push(array[i]);
    }
    result.push(row);
    return result;
}*/

function unFlat(array,chunk){
    let result = [];
    for(let i=0; i< array.length; i+=chunk){
        result.push(array.slice(i,i+chunk));
    }
    return result;
}


///// 3 Una funció per eliminar repetits en un array
function uniqueValues(array){
}

////// 4 Una funció que, de dos array, retorna el producte cartesià, és a dir, un array bidimensional amb totes les combinacions
function cartesianProduct(array1, array2){
}


////// 5 Una funció que, de dos arrays d'objectes amb una relació entre ells definida amb una funció, obtinga l'INNER JOIN. La funció acceptarà dos objectes per dir si estan relacionats.
function innerJoin(array1, array2, relationFunction){
}

///// 6 Una funció com l'anterior per obtindre el LEFT JOIN
function leftJoin(array1, array2, relationFunction){
}