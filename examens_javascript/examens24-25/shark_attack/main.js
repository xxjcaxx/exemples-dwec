import "./style.css"

/*
Ens han encarregat fer una web informativa sobre els atacs de taurons. 

Per poder fer-la hem de obtindre les dades de la següent API pública:

https://public.opendatasoft.com/explore/dataset/global-shark-attack/api/?disjunctive.country&disjunctive.area&disjunctive.activity

Aquesta web tindrà un menú superior amb una llista d'anys, 
en mig una taula amb dades sobre cada atac i baix una secció d'estadístiques.

Cal fer totes les funcions necesàries per a que funcione la web. 
A continuació, en comentaris, trobareu informació de cada funció i la forma d'avaluar-la
*/

//1):  0,5 si funciona,  1 Si funciona, utilitza els comandaments esperats i passa el test
export function getSharkAttackQuery({ dateFrom, dateTo, limit, offset }) {
  /* Aquesta funció acceptarà un objecte amb les dades de la comanda
   i les utilitzarà per retornar una Query correcta a l'API. per exemple, un objecte 
   {dateFrom: "2022-05-13", dateTo: "2023-05-13", limit: 30, offset: 20}
   Retornarà la query sencera pareguda a aquesta:
   /api/explore/v2.1/catalog/datasets/global-shark-attack/records?where=date+%3E+%222022-05-13%22+and+date+%3C+%222023-05-13%22&limit=30&offset=20 
   o a aquesta que és la que diuen en la documentació i que és equivalent:
   /api/explore/v2.1/catalog/datasets/global-shark-attack/records?where=date%20%3E%20%222022-04-29%22%20and%20date%20%3C%20%222023-05-13%22&limit=30&offset=20 
  */
  return `/api/explore/v2.1/catalog/datasets/global-shark-attack/records?${new URLSearchParams(
    [
      ["where", `date > "${dateFrom}" and date < "${dateTo}"`],
      ["limit", limit],
      ["offset", offset],
    ]
  )}`;
}

//2):  0,5 si funciona,  2 Si funciona, utilitza els comandaments esperats i passa el test
export function getSharkAttackData(query) {
  /* Aquesta funció accepta la query i retorna la promesa de descarregar les dades de la API
   */
  return fetch(`https://public.opendatasoft.com${query}`).then(async (response) =>{
    const data = await response.json();
    if(data.error_code){
      console.log(data.error_code);
      return {results:[]};
    }
    return data
  }
    
  ).catch(error=>{
    console.log(error);
    return {results:[]};
  });
}

//3):  0,25 si funciona,  0,5 Si funciona, utilitza els comandaments esperats i passa el test
export function getYearsFromData(data) {
  // Rep els totes les dates i retorna un array d'anys de manera que no hi ha anys repetirs
  return [...new Set(data.results.map((d) => d.year))];
}

//4):
export function generateYearsButtons(years) {
  /* Rep l'array d'anys i retorna un array de botons. 
  Cada botó té en el seu dataset un atribut "year" amb el valor de l'any.
*/
  return years.map((y) => {
    const yearButton = document.createElement("Button");
    yearButton.dataset.year = y;
    yearButton.innerText = y;
    return yearButton;
  });
}

//5):

export function generateTable(data) {
  /*
  Rep totes les dades i retorna una taula amb informació sobre els atacs dels taurons
  Ha de mostrar totes les columnes i la primera fila sera th amb el nom de la columna
  */

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const columns = Object.keys(data.results[0]);
  thead.innerHTML = `<tr>
  ${columns.map((col) => `<th>${col}</th>`).join("")}
    </tr>`;
  const trs = data.results.map((row) => {
    const tr = document.createElement("tr");
    const tds = columns.map((col) => {
      const td = document.createElement("td");
      td.innerText = row[col];
      return td;
    });
    tr.append(...tds);
    return tr;
  });
  table.append(thead, ...trs);
  return table;
}

//6)

export function generateStatistics(data) {
  /**
   * Aquesta funció rep les dades i treu un objecte amb dades estadístiques amb aquesta estructura:
   *
   * {worstMonthOfYear  // pitjor mes de l'any en quantitat d'atacs
   * , worstArea,      // Pitjor area en quantitat d'atacs
   *  PercentOfUnprovokedAttacks,   // % d'atacs provocats front a altres
   *  percentOfMales,               // % de sexe masculí
   *  percentOfFatals,          // % d'atacs fatals
   *  ages: {   "0-10" :    // % d'edat entre 0 i 10
   *            "11-20":    // Algunes edat no són numèriques o no es sap, seran ignorades
   *            "21-30":
   *            "31-40":
   *            "41-50" :
   *            "51-60":
   *            ">60" :
   *    }
   * }
   *
   */
  //console.log(data.results);

  const getMaxCountRepeats = (results) =>
    [
      ...results.reduce((p, c) => {
        (p.has(c) && p.set(c, p.get(c) + 1)) || p.set(c, 1);
        return p;
      }, new Map()),
    ].sort((a, b) => b[1] - a[1])[1][0];

  const getPercent = (results) => (filterFunction) => {
    return 100 * results.filter(filterFunction).length / results.length;
  }

  const getPercentResults = getPercent(data.results);
  const ageRange = (min,max,age) =>  parseInt(age) >= min && parseInt(age) <= max
     
  return {
    worstMonthOfYear: +getMaxCountRepeats(
      data.results.map((r) => r.date.split("-")[1])
    ), // pitjor mes de l'any en quantitat d'atacs
    worstArea: getMaxCountRepeats(data.results.map((r) => r.area)), // Pitjor area en quantitat d'atacs
    PercentOfUnprovokedAttacks: getPercentResults(a => a.type === "Unprovoked"),
    percentOfMales: getPercentResults(a => a.sex === "M"),
    percentOfFatals: getPercentResults(a => a.fatal_y_n === "Y"),
    ages: {
      "0-10": getPercentResults(a => ageRange(0,10,a.age)),  //getPercentOfAge(0, 10), // % d'edat entre 0 i 10
      "11-20": getPercentResults(a => ageRange(11,20,a.age)),
      "21-30": getPercentResults(a => ageRange(21,30,a.age)),
      "31-40": getPercentResults(a => ageRange(31,40,a.age)),
      "41-50": getPercentResults(a => ageRange(41,50,a.age)),
      "51-60": getPercentResults(a => ageRange(51,60,a.age)),
      ">60": getPercentResults(a => ageRange(61,200,a.age)),
    },
  };
}

// 7)

document.addEventListener("DOMContentLoaded", () => {
  /**
   * Aquesta funció no cal testar-la. És la que representa totes les dades anteriors en la web. Es carregarà amb una consulta per defecte que pot ser dos anys fins a la data actual. (getFullYear, setFullYear, toLocaleDateString("en-CA"))
   *
   * Afegirà a #yearButtons els botons dels anys
   * Atendrà al click en els botons per mostrar les dades de l'any clicat.
   *
   * També ha de fer anar el formulari amb data d'inici, de fi, limit i offset per fer búsquedes personalitzades.
   *
   *
   * En la part de baix mostrarà les estadístiques calculades cada vegada que es demanen noves dades.
   */

  const today = new Date();
  const lastYear = new Date(new Date().setFullYear(today.getFullYear() - 2));
  const queryObject = {
    dateFrom: lastYear.toLocaleDateString("en-CA"),
    dateTo: today.toLocaleDateString("en-CA"),
    limit: 40,
    offset: 0,
  };
  // console.log( queryObject);
  const query = getSharkAttackQuery(queryObject);

  function render(data) {
    document
    .querySelector("#yearsButtons").innerHTML='';
    document
      .querySelector("#yearsButtons")
      .append(...generateYearsButtons(getYearsFromData(data)));

    document
      .querySelector("#menu form").addEventListener('click', (event) => {
        
        if (event.target.id === "customQuery") {
          event.preventDefault();
          const formData = new FormData(document
            .querySelector("#menu form"));
          const data = Object.fromEntries(formData.entries());
          const fechaInicio = new Date(data.fechaInicio).toISOString().split('T')[0];
          const fechaFin = new Date(data.fechaFin).toISOString().split('T')[0];
          data.fechaInicio = fechaInicio;
          data.fechaFin = fechaFin;
          const queryObject = {
            dateFrom: data.fechaInicio,
            dateTo: data.fechaFin,
            limit: data.limit,
            offset: data.offset,
          };
           console.log( queryObject);
          const query = getSharkAttackQuery(queryObject);
          getSharkAttackData(query).then(render);
        }

        if(event.target.dataset.year){
          const queryObject = {
            dateFrom: `${event.target.dataset.year}-01-01`,
            dateTo: `${event.target.dataset.year}-12-31`,
            limit: 30,
            offset: 0,
          };
           console.log( queryObject);
          const query = getSharkAttackQuery(queryObject);
          getSharkAttackData(query).then(render);
        }
      });
      document.querySelector("#data").innerHTML="";
    document.querySelector("#data").append(generateTable(data));
    const stats = generateStatistics(data);
    const statsDiv = document.createElement("div");
    statsDiv.innerHTML = `
    <h2>Stats</h2>
    <p>Wost Mounth of Year: ${stats.worstMonthOfYear}</p>
    <p>Wost Area: ${stats.worstArea}</p>
    <p>Unprovoked Attacks: ${stats.PercentOfUnprovokedAttacks}%</p>
    <p>Males: ${stats.percentOfMales}%</p>
    <p>Fatals: ${stats.percentOfFatals}%</p>
    <div class="histograma">
    <div class="barraContenedor">
      <div class="barra" style="height :${(stats.ages["0-10"] / 20) * 100}%">
      <span>${stats.ages["0-10"]}</span>
      </div>
      <div class="etiqueta">0-10</div>
    </div>
    <div class="barraContenedor">
         <div class="barra" style="height : ${(stats.ages["11-20"] / 20) * 100}%">
      <span>${stats.ages["11-20"]}</span>
      </div>
      <div class="etiqueta">11-20</div>
      </div>
      <div class="barraContenedor">
         <div class="barra" style=" height :${(stats.ages["21-30"] / 20) * 100}%">
      <span>${stats.ages["21-30"]}</span>
      </div>
      <div class="etiqueta">21-30</div>
      </div>
<div class="barraContenedor">
         <div class="barra" style=" height :${(stats.ages["31-40"] / 20) * 100}%">
      <span>${stats.ages["31-40"]}</span>
      </div>
      <div class="etiqueta">31-40</div>
</div>
<div class="barraContenedor">
         <div class="barra" style="height : ${(stats.ages["41-50"] / 20) * 100}%">
      <span>${stats.ages["41-50"]}</span>
      </div>
      <div class="etiqueta">41-50</div>
      </div>
<div class="barraContenedor">
         <div class="barra" style="height : ${(stats.ages["51-60"] / 20) * 100}%">
      <span>${stats.ages["51-60"]}</span>
      </div>
      <div class="etiqueta">51-60</div>
      </div>
<div class="barraContenedor">
         <div class="barra" style=" height :${(stats.ages[">60"] / 20) * 100}%">
      <span>${stats.ages[">60"]}</span>
      </div>
      <div class="etiqueta">60 or more</div>
    </div>
    </div>
  `;
  document.querySelector("#statistics").innerHTML="";
    document.querySelector("#statistics").append(statsDiv);

  }


  getSharkAttackData(query).then(render);
});
