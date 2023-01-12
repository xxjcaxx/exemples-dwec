import './styles.css';

const compose = (...fns) => x => fns.reduceRight(async (v, f) => f(await v), x)
const consoleLog = data => {console.log(data); return data;}

//a) url => promise<partidos[]>
//const json = r => r.json()
const getPartidos = async url => compose(r => r.json(),fetch)(url) /*{
    let response = await fetch(url)
    let partidos = await response.json()
    return partidos;
     */ 
//}

//b) partidos[] => partidos[]
const cleanPartidos = partidos => partidos.filter(p => p.Local != '')

//c) partidos[] => semanas[]
const groupPartidos = partidos => 
   // let semanas = [...new Set((await partidos).map(p => p['Sem.']))]
   // També es pot fer amb l'array de setmanes i fent un filter dels partits
    Object.values(partidos.reduce((semObject,partido) => {
                            semObject[`${partido['Sem.']}`] = semObject[`${partido['Sem.']}`] 
                                ? [...semObject[`${partido['Sem.']}`], partido] 
                                : [partido];
                            return semObject;
                             },{}))


const htmlPartido = partido => `<tr id="partido-${partido['Sem.']}-${partido['Local']}"><td>${partido['Local']}</td><td>${partido['Visitante']}</td> <td>${partido['Marcador']}</td> </tr>`;
const htmlPartidos = partidos => partidos.map(htmlPartido).join('')

const renderPartidos = container =>  async partidos => container.innerHTML = htmlPartidos(await partidos);
//d)  semanas[] => table[]
const semanaToTable =  semanas =>  semanas.map(semana => { 
    let table = document.createElement('table');
    table.innerHTML = htmlPartidos(semana);
    return table;
})

// e
const cleanContainer = container => { container.innerHTML =''; return container}
// e) container => tables[] => null (DOM append)
const addContainer = container => tables => { 
    cleanContainer(container);  
    tables.forEach(table => {
        let divTable = document.createElement('div');
        divTable.append(table);
        container.append(divTable);
        });
}

// f) semanas[] => equipo => semanas[partidos[](filtrados)] 
const filterTeam = arraySemanas => equipo => arraySemanas.map(
    semana => semana.filter(
        partido => partido.Local.includes(equipo) || partido.Visitante.includes(equipo)  
        )
    );

const splitMarcador = marcador => marcador.split('–');

const winner = partido => {
    let [golesLocal, golesVisitante] = splitMarcador(partido.Marcador);
    return golesLocal > golesVisitante ? '1' : golesLocal < golesVisitante ? '2' : 'X'; 
}

const points = equipo => partido => {
    if (partido.Local == equipo){
        return winner(partido) === '1' ? 3 : winner(partido) === 'X' ? 1 : 0;
    } else {
        return winner(partido) === '1' ? 0 : winner(partido) === 'X' ? 1 : 3;
    }
}

const goals = equipo => partido => {
    let [golesLocal, golesVisitante] = splitMarcador(partido.Marcador);
    return partido.Local == equipo ? {gFavor: golesLocal, gContra : golesVisitante} :  {gFavor: golesVisitante, gContra : golesLocal} ;
}
//h) semanas[] => puntos[] 
const getPoints = (semanas) => {
    let partidos = semanas.flat();
    let equipos = semanas[0].map(p => [p.Local, p.Visitante]).flat();
    let puntos = equipos.map(equipo =>{
        let pointsEquipo = points(equipo);
        let goalsEquipo = goals(equipo);
        let puntuacion = partidos.filter(partido => partido.Local == equipo || partido.Visitante == equipo)
                                 .reduce((estadisticas,partido)=>{
                                   estadisticas.puntos += parseInt(pointsEquipo(partido));
                                   estadisticas.gFavor += parseInt(goalsEquipo(partido).gFavor);
                                   estadisticas.gContra += parseInt(goalsEquipo(partido).gContra);
                                   
                                   return estadisticas;
                                 },{puntos: 0, gFavor: 0, gContra: 0})
        return {equipo,puntuacion}
    });
    return puntos;
}

const sortPoints = points => points.sort((a,b) => a.puntuacion.puntos > b.puntuacion.puntos ? 0 : 1);

// h) puntos[] => table
const pointsToTable = points => {
    let table = document.createElement('table');
    table.innerHTML = '<tr><th>Equipo</th><th>Goles a Favor</th><th>Goles en contra</th><th>Puntos</th></tr>' 
    table.innerHTML += points.map(p => `<tr><td>${p.equipo}</td><td>${p.puntuacion.gFavor}</td><td>${p.puntuacion.gContra}</td><td>${p.puntuacion.puntos}</td></tr>`).join('');
    return [table];
}

const getSemanas = compose(groupPartidos,cleanPartidos,getPartidos);
const renderSemanas = compose(addContainer(document.querySelector('#matches')),semanaToTable,consoleLog);
const renderPoints = compose(addContainer(document.querySelector('#points')),pointsToTable,sortPoints,getPoints,consoleLog);


document.addEventListener('DOMContentLoaded',()=>{
    
    let semanas = getSemanas('liga.json');
    renderSemanas(semanas);
    renderPoints(semanas);

// G)
    document.querySelector('#filter').addEventListener('keyup',async function(){
        compose(
            addContainer(document.querySelector('#matches')),
            semanaToTable,
            filterTeam(await semanas)
        )(this.value);
    });

});