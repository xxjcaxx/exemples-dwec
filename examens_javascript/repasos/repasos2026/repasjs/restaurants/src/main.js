import "./style.css";

class Restaurant {
  constructor(restaurantRaw) {
    Object.assign(this, restaurantRaw.restaurant);
  }
  renderRestaurant(restaurant) {
    const rDiv = document.createElement("div");
    rDiv.innerHTML = `
      <h2>${restaurant.name}</h2>
      <img src="${restaurant.thumb}"/>
  `;
    return rDiv;
  }
}

async function loadRestaurants(url, page, limit) {
  const response = await fetch(`${url}?_page=${page}&_limit=${limit}`);
  const restaurants = await response.json();
  const restaurantsClass = restaurants.map((r) => new Restaurant(r));
  return restaurantsClass;
}

function renderRestaurantList(restaurants) {
  const containerDiv = document.createElement("div");
  containerDiv.append(...restaurants.map(r => r.renderRestaurant(r)));
  return containerDiv;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('#app');
  let restaurantsList = [];
  loadRestaurants("https://exemples-dwec.onrender.com/restaurants", 1, 25).then(
    (rs) => {
      restaurantsList = rs;
      container.append(renderRestaurantList(rs));
    }
  );
  document.querySelector('#buscarInput').addEventListener("keyup",()=>{
    restaurantsList
  })
});
