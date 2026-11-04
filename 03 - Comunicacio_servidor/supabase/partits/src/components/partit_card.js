export {partitCard}

function partitCard(partit) {
  
  return `
  <div class="col-3">
    <div class="card shadow-sm h-100">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span>${partit.league_name} <small class="text-body-secondary">(${partit.country})</small></span>
        <span class="badge theme-accent">${partit.season}</span>
      </div>
      <div class="card-body text-center">
        <div class="row align-items-center">
          <div class="col-4 fw-bold">${partit.home_team}</div>
          <div class="col-4 display-6">${partit.home_goals} - ${partit.away_goals}</div>
          <div class="col-4 fw-bold">${partit.away_team}</div>
        </div>
        <p class="text-body-secondary mb-0 mt-2">Descanso: ${partit.ht_result}</p>
      </div>
      <div class="card-footer text-body-secondary text-center">
        ${partit.match_date} · ${partit.time}
      </div>
    </div>
    </div>`;
}
