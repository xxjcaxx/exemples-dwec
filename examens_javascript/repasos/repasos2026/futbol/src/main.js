import "./style.css";
import cara from "./assets/1.png";

function renderMatch(match) {
  const matchTemplate = `<div class="match-card">
  <div class="match-header">
    <span class="league-name">${match.league_name} (${match.country})</span>
    <span class="match-season">${match.season}</span>
  </div>
  
  <div class="match-body">
    <div class="team home">
      <span class="team-name">${match.home_team}</span>
      <span class="team-goals">${match.home_goals}</span>
    </div>
    
    <div class="match-info">
      <div class="final-score">${match.ft_result}</div>
      <div class="match-status">Finalizado</div>
      <div class="ht-score">(Descanso: ${match.ht_result})</div>
    </div>
    
    <div class="team away">
      <span class="team-goals">${match.away_goals}</span>
      <span class="team-name">${match.away_team}</span>
    </div>
  </div>

  <div class="match-footer">
    <div class="detail-item">
      <strong>Fecha:</strong> ${match.match_date} - ${match.time}
    </div>
    <div class="detail-item">
      <strong>Primer gol:</strong> Minuto ${match.first_goal_time}
    </div>
  </div>
</div>`;

  const divAux = document.createElement("div");
  divAux.innerHTML = matchTemplate;
  return divAux.firstElementChild;
}

function selectLeagues(leagues) {
  const select = document.createElement("select");
  leagues.forEach((league) => {
    const option = document.createElement("option");
    option.value = league;
    option.innerText = league;
    select.append(option);
  });
  return select;
}

async function getPartits(url, containerApp){
  const response = await fetch(url);
  const partits = await response.text();
  const llistaPartits = partits.split("\n").map((linea) => linea.split(","));
  const keys = llistaPartits[0];
  const data = llistaPartits.slice(1);
  let matches = data.map((linea) =>
    Object.fromEntries(keys.map((k, i) => [k, linea[i]])),
  );
  const leagues = new Set(matches.map((p) => p.league_name));

  console.log(leagues);
  containerApp.append(selectLeagues(leagues));
  matches.slice(0, 20).forEach((p) => containerApp.append(renderMatch(p)));

}

document.addEventListener("DOMContentLoaded", () => {
  const containerApp = document.querySelector("#app");
  getPartits("/football_charts_matches.csv",containerApp);
  
  /*
  fetch("/football_charts_matches.csv")
    .catch((error) => console.log(error))
    .then((r) => r.text())
    .then((partits) => {
      const llistaPartits = partits
        .split("\n")
        .map((linea) => linea.split(","));
      const keys = llistaPartits[0];
      const data = llistaPartits.slice(1);
      matches = data.map((linea) =>
        Object.fromEntries(keys.map((k, i) => [k, linea[i]])),
      );
      const leagues = new Set(matches.map(p => p.league_name))
    
      console.log(leagues);
      containerApp.append(selectLeagues(leagues))
      matches
        .slice(0, 20)
        .forEach((p) => containerApp.append(renderMatch(p)));
    });
*/
  /* const llistaPartits = partits.split("\n").map((linea) => linea.split(","));
  //console.log(llistaPartits);

  // Convertir el array de partits en una array d'objectes partit (classe opcional)

  const keys = llistaPartits[0];
  const data = llistaPartits.slice(1);
  const llistaObjectesPartit = data.map(linea =>
    Object.fromEntries(keys.map((k,i) => [k,linea[i]]))
  );*/

  /* class Partit {
    constructor(
      ...datos
    ) {
      const [...keys] = datos;
      const objectDatos = {...keys};
      Object.assign(this,objectDatos);
    }
  }*/
  /*
  class Partit {
    constructor(
      league,
      league_name,
      country,
      season,
      match_date,
      time,
      home_team,
      away_team,
      ht_result,
      ft_result,
      home_goals,
      away_goals,
      total_goals,
      result,
      first_goal_time,
      all_goal_times,
    ) {
      this.league = league;
      this.league_name = league_name;
      this.country = country;
      this.season = season;
      this.match_date = match_date;
      this.time = time;
      this.home_team = home_team;
      this.away_team = away_team;
      this.ht_result = ht_result;
      this.ft_result = ft_result;
      this.home_goals = home_goals;
      this.away_goals = away_goals;
      this.total_goals = total_goals;
      this.result = result;
      this.first_goal_time = first_goal_time;
      this.all_goal_times = all_goal_times;
    }
  }

 */

  // const llistaObjectesPartit = data.map(linea => new Partit(...linea));
  // console.log(llistaObjectesPartit);

  // Mostrar 100 partits
});
