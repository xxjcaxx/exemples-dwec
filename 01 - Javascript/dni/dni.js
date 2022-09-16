(()=>{

    function validar(dni){
        let dniRegExp = /^[0-9]{8}$/;
        let valid = dniRegExp.test(dni);
        return valid;
    }

    let validarFletxa = dni => /^[0-9]{8}$/.test(dni);

    console.log(validarFletxa('12345F78'));

    function lletra(dni){
        let lletres = "TRWAGMYFPDXBNJZSQVHLCKE".split('');
        return lletres[parseInt(dni) % 23];
    }

    console.log(lletra('12345668'));

    function validarLletra(dni){
      /*  if (validar(dni)){
            return dni+lletra(dni);
        }
        else {
            return false;
        }*/
        return validar(dni) ? dni+lletra(dni) : false
    }

    console.log(validarLletra('12345648'));

})();