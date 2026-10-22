import "./style.css";
import cara from "./assets/1.png";
import { partits } from "./football_charts_matches";

document.addEventListener("DOMContentLoaded", () => {
  const llistaPartits = partits.split("\n").map((linea) => linea.split(","));
  //console.log(llistaPartits);

  // Convertir el array de partits en una array d'objectes partit (classe opcional)

  const keys = llistaPartits[0];
  const data = llistaPartits.slice(1);
  const llistaObjectesPartit = data.map(linea =>
    Object.fromEntries(keys.map((k,i) => [k,linea[i]]))
  );

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
  console.log(llistaObjectesPartit);

  // Mostrar 100 partits
});
