(() => {
  document.addEventListener("DOMContentLoaded", () => {
    function restaurarP1() {
      let p1 = document.querySelector("#p1");
      p1.innerHTML = ` P1
      <img src="loading.gif" alt="">`;

      new Promise(function executar(resolver, rechazar) {
        p1.addEventListener("click", function click(event) {
          resolver();
        });
      }).then(function () {
        p1.innerHTML = "<p>Promesa 1</p>";
      });
    }

    restaurarP1();

    document.querySelector("#p2").addEventListener("click", function () {
      this.innerHTML = "";
      /*   setTimeout(()=>{
        this.innerHTML += "Missatge 1 ";
        setTimeout(()=>{
          this.innerHTML += "Missatge 2 ";
          setTimeout(()=>{
            this.innerHTML += "Missatge 3 ";
          },Math.random()*1000);
        },Math.random()*1000);
      },Math.random()*1000);*/

      function crearPromesa(message) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(message);
          }, Math.random() * 1000);
        });
      }

      crearPromesa("Missatge 1")
        .then((message) => {
          this.innerHTML = message;
          return crearPromesa("Missatge 2");
        })
        .then((message) => {
          this.innerHTML = message;
          return crearPromesa("Missatge 3");
        })
        .then((message) => {
          this.innerHTML = message;
        });
    });

    /// Fes que al fer click al p2, escriga 3 paraules en un temps aleatori de diferencia
    function restaurarP2() {
      /*  let p2 = document.querySelector("#p2");
      p2.innerHTML = ` P2
    <img src="loading.gif" alt="">`;
      function promesaN(n) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(n);
          }, Math.random() * 1000);
        });
      }

      function createN(n, element) {
        let pN = document.createElement("p");
        pN.innerHTML = n;
        element.append(pN);
      }

      //   p2.removeEventListener("click");
      p2.addEventListener("click", function click(event) {
        p2.innerHTML = "";
        promesaN(1)
          .then((n) => {
            createN(n, p2);
            return promesaN(2);
          })
          .then((n) => {
            createN(n, p2);
            return promesaN(3);
          })
          .then((n) => {
            createN(n, p2);
          });
      });*/
    }

    restaurarP2();
    /// Transforma, per a p3, el que fa p2 però en Promise.all  ¿Les fa seqüencialment?

    document.querySelector("#p3").addEventListener("click", function () {
      this.innerHTML = "";
      
     
      function crearPromesa3(message) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(message);
            
          }, Math.random() * 100);
        });
      }

      let promiseI = Promise.resolve(`Missatge 0`)

      for (let i=1; i<1000; i++){
        promiseI = promiseI.then((message)=>{ 
          this.innerHTML = message; 
          return  crearPromesa3(`Missatge ${i}`)})
       
      }


   /*   Promise.all(llistaPromeses).then((missatges) => {
        console.log(missatges);
        for(let m of missatges){
          this.innerHTML = m;
        }
      });*/
    });

    /*  crearPromesa3("Missatge 1")
    .then((message)=>{
      this.innerHTML = message;
      return crearPromesa3("Missatge 2");
    })
    .then((message)=>{
      this.innerHTML = message;
      return crearPromesa3("Missatge 3");
    })
    .then((message)=>{
      this.innerHTML = message;});
  });*/

    function restaurarP3() {
      /* let p3 = document.querySelector("#p3");
      p3.innerHTML = ` P3
      <img src="loading.gif" alt="">`;

      function promesa3N(n) {
        return new Promise((resolve) => {
          setTimeout(() => {
            // create3N(n, p3);
            resolve(n);
          }, Math.random() * 1000);
        });
      }

      function create3N(n, element) {
        let pN = document.createElement("p");
        pN.innerHTML = n;
        element.append(pN);
      }

      function clickP3() {
        p3.innerHTML = "";
        /*  let arrayPromeses = [promesa3N(1), promesa3N(2), promesa3N(3)];
        Promise.all(arrayPromeses).then((n) => {
          console.log(n);
          for (let numero of n) create3N(numero, p3);
        });
  
         for (let p of arrayPromeses) {
          p.then((n) => create3N(n, p3));
        }*/
      /// Solucio en for:
      // let arrayN = [1, 2, 3];
      /* let promesaI = Promise.resolve();
        for (let n of arrayN) {
          promesaI = promesaI.then(() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                create3N(n, p3);
                resolve(n);
              }, Math.random() * 1000);
            });
          });
        }
  */
      /// Solucio en reduce:
      /*  arrayN.reduce((anterior, actual) => {
          return anterior.then(() => {
            return new Promise((r) => {
              setTimeout(() => {
                create3N(actual, p3);
                r();
              }, Math.random() * 1000);
            });
          });
        }, Promise.resolve());
      }

      p3.removeEventListener("click", clickP3, true);
      p3.addEventListener("click", clickP3);*/
    }

    restaurarP3();

    /// Fes que siga seqüencial amb un reduce

    /// Fes que al fer click en p4 retorne la promesa de restaurar els gif i promeses anteriors. Tardarà 1 segon en restaurar

    let p4 = document.querySelector("#p4");
    p4.addEventListener("click", function click(event) {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          restaurarP1();
          resolve();
        }, 1000);
      })
        .then(
          () =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                restaurarP2();
                resolve();
              }, 1000);
            })
        )
        .then(
          () =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                restaurarP3();
                resolve();
              }, 1000);
            })
        );
    });

    /// Al fer click en p5, generarà un array de números aleatori entre 1000 i 10000.
    /// Per a cada número crearà una promesa que tardarà el mateix que el número.
    /// Quan passe el temps de cada promesa, canviarà el contingut del div pel número

    const temps = Array(100)
      .fill()
      .map(() => Math.round(Math.random() * 1000));
    const p5 = document.querySelector("#p5");
    console.log(temps);

    p5.addEventListener("click", function click(event) {
      let promesaAnterior = Promise.resolve(0);
      for (let n of temps) {
        promesaAnterior = promesaAnterior.then((temps) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              p5.innerHTML = `<h2>${n}</h2>`;
              resolve(n);
            }, temps);
          });
        });
      }
    });
    /// Fes el que fa p3 amb async/await

    let p6 = document.querySelector("#p6");
    p6.innerHTML = ` P6
    <img src="loading.gif" alt="">`;

    let array6 = [1, 2, 3, 4, 5, 6, 7];

    async function promeses6() {
      function getPromise(numero) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, Math.random() * 1000);
        }).then(() => {
          let n = document.createElement("p");
          n.innerHTML = numero;
          p6.append(n);
        });
      }

      for (let i of array6) {
        await getPromise(i);
      }

      /* array6.reduce(async (anterior, actual) => {
        // console.log(anterior);
        await getPromise(anterior, actual);
      }, 0);
      */
    }

    p6.addEventListener("click", () => {
      p6.innerHTML = "";
      promeses6();
    });
  });
})();
