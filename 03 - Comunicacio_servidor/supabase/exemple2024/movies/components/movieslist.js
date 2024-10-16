export { generateMoviesList };

function generateMovieRow(movie) {
  const arrayTDs = ["original_title", "release_date"]
    .map(
      (col) =>
        `<td>
            ${movie[col]}
        </td>`
    )
    .join(" ");
  return `<tr>${arrayTDs}</tr>`;
}

function generateMoviesList(moviesList) {
  const moviesListDiv = document.createElement("div");
  moviesListDiv.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Títol original</th>
          <th>Data de llançament</th>
        </tr>
      </thead>
      ${moviesList.map(generateMovieRow).join(" ")}
    </table>
  `;
  return moviesListDiv;
}
