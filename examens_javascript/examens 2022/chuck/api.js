export { randomFact, categoryList, categoryQuery, searchQuery };

function apiQuery(uri) {
  return fetch("https://api.chucknorris.io/jokes/" + uri).then((result) =>
    result.json()
  );
}

function randomFact() {
  return apiQuery("random");
}

function categoryList() {
  return apiQuery("categories");
}

function categoryQuery(cat) {
  return apiQuery("random?category=" + cat);
}

function searchQuery(q) {
  return apiQuery("search?query=" + q);
}
