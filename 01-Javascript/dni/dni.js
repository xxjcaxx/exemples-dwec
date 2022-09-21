"use strict";

(() => {
  ////////////////////  Exercicis 1,2,3 ////////////////////////////

  function validar(dni) {
    let dniRegExp = /^[0-9]{8}$/;
    let valid = dniRegExp.test(dni);
    return valid;
  }

  let validarFletxa = (dni) => /^[0-9]{8}$/.test(dni);
  //  console.log(validarFletxa('12345F78'));

  function lletra(dni) {
    let lletres = "TRWAGMYFPDXBNJZSQVHLCKE".split("");
    return lletres[parseInt(dni) % 23];
  }

  // console.log(lletra('12345668'));

  function validarLletra(dni) {
    /*  if (validar(dni)){
            return dni+lletra(dni);
        }
        else {
            return false;
        }*/
    return validar(dni) ? dni + lletra(dni) : false;
  }

  //   console.log(validarLletra('12345648'));

  ////////////////// Exercici 4

  const arrayDNIs = ["124312", "12345678", "sadf21123", "11111111", "22222222"];

  function validarLletraArray(DNIList){
    let DNIValidList = [];
    for(let dni of DNIList){
        let dniLletra = validarLletra(dni);
        if (dniLletra){
            DNIValidList.push(dniLletra);
        }
    }
    return DNIValidList;

  }

  console.log(validarLletraArray(arrayDNIs));

  

  function DNI(dni){
    this.validar = 
    this.calcularLletra =
    this.numeros = 
    this.dniComplet = 
  }

  let LlistaDNIObjectes = [];
  for ( let dni of DNIList){
    let DNIObjecte = new DNI(dni);
    LlistaDNIObjectes.push(DNIObjecte);
  }

  console.log(LlistaDNIObjectes);


})();
