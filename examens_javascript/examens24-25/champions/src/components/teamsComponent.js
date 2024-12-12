import { getTeams } from "../services/supaservice";
import {
  compose,
  sumStats,
  cleanData,
  colorArray,
  extractDataToArray,
} from "../functionals";
import { appendDivs, createAndAppend, createDivs } from "../dom";
import Chart from "chart.js/auto";

export class CustomTeams extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const { team_id, team, logo } = this.data;
    this.innerHTML = ` <div id="${team_id}" class="team">
          <img src="${logo}" alt="${team}">
          <p>${team}</p>
        </div>`;

    this.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("teamSelected", {
          bubbles: true,
          detail: {
            team: team_id,
          },
        })
      );
    });
  }
}

export class CustomTeamInfo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const { team_id, team, logo, country, players } = this.data;
    this.innerHTML = ` <div id="info-${team_id}" >

        <div class="team-info-header">
        <div class="team">
          <img src="${logo}" alt="${team}">
          <p>${team}</p>
          <p>${country}</p>
          </div>

          <div class="statistics"></div>
          </div>

        </div>`;

    const totalsArray = extractDataToArray(cleanData(
      players
        .map((p) => p.goals)
        .map(cleanData)
        .reduce((p, c) => sumStats(p, c)))
    );

    const playersDatasets = players
      .filter((p) => p.goals.goals > 0)
      .map((p) => ({ player_name: p.player_name, ...p.goals }))
      .map((pD) => [pD.player_name, ...extractDataToArray(pD)])
      .map((pD, i) => ({
        label: pD[0],
        data: pD.slice(1),
        fill: true,
        backgroundColor: colorArray(i) + "22",
        borderColor: colorArray(i),
        borderWidth: 1,
      }));

    const statistics = this.querySelector(".statistics");

    statistics.innerHTML = `
          <canvas id="goalsRadarChart" style="width: 800px; height: 300px;"></canvas>
          `;

    let ctx = statistics.querySelector("#goalsRadarChart").getContext("2d");
    let goalsRadarChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "Head",
          "Left Foot",
          "Right Foot",
          "Inside Area",
          "Outside Area",
          "Penalties",
        ],
        datasets: [
          {
            label: "Total",
            data: totalsArray,
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          ...playersDatasets,
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right", 
            labels: {
              font: {
                size: 12,
              },
            },
          },
        },
        scale: {
          ticks: {
            beginAtZero: true,
            max: 10,
          },
        },
      },
    });

    const playersDiv = document.createElement("div");
    playersDiv.id = "players";
    this.querySelector("div").append(playersDiv);

    createAndAppend({tag:'custom-player',container:playersDiv})(players);
  }
}
