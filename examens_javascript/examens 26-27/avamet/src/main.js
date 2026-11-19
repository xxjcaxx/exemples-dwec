
async function getData(url,port,table,user,password){
  const uri = `https://${url}:${port}/${table}/_search?size=4000`;
  console.log(uri)
  const response = await fetch(uri, 
  { headers: { "Authorization": "Basic " + btoa(`${user}:${password}`) } }); 
  const data = await response.json();
  return data;

}

function getDays(data){
  const hits = data.hits.hits;
  const dates = hits.map(h => h._source.live_updated);
  const days = dates.map(d => d.split(" ")[0]);
  return [...new Set(days)];
}

function renderSelectDays(days){
  const select = document.createElement('select');
  select.id = "selectDays";
  /*days.forEach(day => {
    const option = document.createElement('option');
    option.value = day;
    option.innerText = day;
    select.append(option);
  });*/
  const daysOptions = days.map(day => `<option value="${day}">${day}</option>`).join(" ")
  select.innerHTML = daysOptions;
  return select;
}

function getRegistersDay(data,day){
  return data.hits.hits.filter(register => {
    const dayRegister = register._source.live_updated.split(" ")[0];
    return dayRegister == day;
  }).map(r => r._source);

}

function getStatistics(dataDay){
  const temperatures = dataDay.map(r => r.live_temp);
 
  const max = Math.max(...temperatures);
  const min = Math.min(...temperatures);
  const avg = Math.round(10*temperatures.reduce((p,c)=> p+c,0)/temperatures.length)/10;
  const hourMax = dataDay.find(r => r.live_temp == max).live_updated.split(" ")[1];
  const hourMin = dataDay.find(r => r.live_temp == min).live_updated.split(" ")[1];
  const randomIndex = Math.floor(Math.random()*dataDay.length);
  const fotoRandom = dataDay[randomIndex].webcam1_file;
  return {max, min, avg, hourMax, hourMin, fotoRandom};
}

function renderStatistics(statistics, day){
  const div = document.createElement('div');
  div.innerHTML = `
  <h2>${day}</h2>
  <img style="width:600px" src="http://10.100.22.106/historic/${statistics.fotoRandom}">
  <p>Max: ${statistics.max}, Min: ${statistics.min}</p>
  `;
  return div;
}

function renderDay(data,day){
    const registersDay = getRegistersDay(data,day);
    console.log(registersDay);
    const statistics = getStatistics(registersDay);
    const divStatistics = renderStatistics(statistics,day);
    const appDiv = document.querySelector("#app");
    appDiv.innerHTML = '';
    appDiv.append(divStatistics);
}


document.addEventListener("DOMContentLoaded", async ()=>{
  const data = await getData("10.100.22.106","9200","avamet","alumne","alumne1234")
    const days = getDays(data);
    const select = renderSelectDays(days);
  const appDiv = document.querySelector("#app");
    const headerDiv = document.querySelector("#header");
    headerDiv.append(select);

    renderDay(data,days.at(-1));
  

  select.addEventListener("change",()=>{
    console.log(select.value);
     renderDay(data,select.value);
  })
});

