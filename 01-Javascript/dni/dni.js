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

  const validarLletra = (dni) => validar(dni) ? dni + lletra(dni) : false;

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
    this.validar = (dni) => /^[0-9]{8}$/.test(dni);
    this.calcularLletra =  function (dni) {
      let lletres = "TRWAGMYFPDXBNJZSQVHLCKE".split("");
      return lletres[parseInt(dni) % 23];
    }
    this.numeros = dni;
    this.dniComplet = this.validar(this.numeros) ? dni + this.calcularLletra(this.numeros) : false;
    this.mostrarDNI = () =>  console.log(this, this.dniComplet); 
  }

  let LlistaDNIObjectes = [];
  for ( let dni of arrayDNIs){
    let DNIObjecte = new DNI(dni);
    LlistaDNIObjectes.push(DNIObjecte);
  }

  console.log(LlistaDNIObjectes);

  for(let d of LlistaDNIObjectes){
    d.mostrarDNI();
  }


  ///////////////////// Exercicis 5 i 6

  document.addEventListener("DOMContentLoaded",()=>{
    let inputDNI = document.querySelector('#dni');
    let buttonDNI = document.querySelector('#calcularLletra');
    buttonDNI.addEventListener('click',()=>{
      let valueDNI = inputDNI.value;
      console.log(validarLletra(valueDNI));
    });

    ///// 6 ///////////
    const lletres = "TRWAGMYFPDXBNJZSQVHLCKE".split("");
    document.querySelector('#calcularDNIs').addEventListener('click',()=>{
      let lletra = document.querySelector('#lletra').value;
      let base = lletres.indexOf(lletra);
      console.log(lletra,':',base);
      let arrayDNIs = [];
      for(let i=0;i<20;i++){
        let dniGenerat = (Math.floor(Math.random()*3913043)+434782)*23+base;
        arrayDNIs.push(validarLletra(dniGenerat));
      }
      console.log(arrayDNIs);
    });

  });


})();
