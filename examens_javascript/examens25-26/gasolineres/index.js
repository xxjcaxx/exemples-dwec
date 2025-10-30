async function getGasData(provincia) {
    return await
        (await
            fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia/${provincia}`))
            .json();
}

async function getProvincias() {
    return await (await fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/')
    ).json()
}



function renderProvincias(provincias) {
    const divProvincias = document.createElement('div');
    divProvincias.innerHTML = `
    <h2>Provincias</h2>
    <select id="provincia">
    </select>
    <h2>Margen de precio</h2>
    <p>Tipo de combustible</p>
    <select id="gasType">
        <option value="gas95">Gasolina 95</option>
        <option value="gas98">Gasolina 98</option>
        <option value="diesel">Diesel</option>
        </select>
    <p id="priceRangeLabel" >Diferencia máxima de precio: 0.05</p>
    <input type="range" id="priceRange" min="0" max="1" step="0.01" value="0.05">
    
    `;
    const select = divProvincias.querySelector('#provincia');
    provincias.forEach(provincia => {
        const option = document.createElement('option');
        option.value = provincia.IDPovincia;
        option.text = provincia.Provincia;
        select.appendChild(option);
    });
    const priceRangeInput = divProvincias.querySelector('#priceRange');
    const priceRangeLabel = divProvincias.querySelector('#priceRangeLabel');

    function emitChangeEvent() {
        const data = {
            provincia: select.value,
            gasType: divProvincias.querySelector('#gasType').value,
            priceRange: parseFloat(priceRangeInput.value)
        }
        divProvincias.dispatchEvent(new CustomEvent('changeFilters', { detail: data }));
    }

    priceRangeInput.addEventListener('input', () => {
        priceRangeLabel.textContent = "Diferencia máxima de precio: " + priceRangeInput.value;
    });

    select.addEventListener('change', emitChangeEvent)
    priceRangeInput.addEventListener('input', emitChangeEvent);
    divProvincias.querySelector('#gasType').addEventListener('change', emitChangeEvent);

    return divProvincias;

}


function generateMap(idContainer, lat, long, zoom) {
    const map = L.map(idContainer).setView([lat, long], zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    return map;
}

function addGasStations(map) {
    let markers = [];
    return function (gasStations) {
        // primer borrar 
        markers.forEach(marker => map.removeLayer(marker));
        // despres tornar a crear
        markers = gasStations.map(station => {
            const marker = L.marker([station.latitude, station.longitude]).addTo(map)
                .bindPopup(`${station.municipality} <br> ${station.name} <br> ${station.address} <br> ${station.schedule}
                ${station.gas95 ? `<br> Gasolina 95: ${station.gas95}` : ''}
                ${station.gas98 ? `<br> Gasolina 98: ${station.gas98}` : ''}
                ${station.diesel ? `<br> Diesel: ${station.diesel}` : ''}`
                )
            return marker;
        });
    }

}


function getBestGasStations(gasStations, gasType, priceRange) {
    // Retorna les millors gasolineres ordenades per preu que estiguen en el rang de preus respecte a la millor
    // Desprès de normalitzar, si la gasolinera no té eixe tipus, el preu és null. Cal filtrar també per eixe criteri.
    // Les retorna ordenades
    const bestGasStations = gasStations.filter(station => station[gasType])
        .sort((a, b) => a[gasType] - b[gasType]);

    const best = bestGasStations[0];
    return bestGasStations.filter(station => station[gasType] <= best[gasType] + priceRange)
}

function normalizeStationData(rawData) {
    return rawData.ListaEESSPrecio.map(item => ({
        id: item["IDEESS"],
        name: item["Rótulo"] || item["Rotulo"],
        address: item["Dirección"] || item["Direccion"],
        province: item["Provincia"],
        municipality: item["Localidad"],
        postalCode: item["C.P."],
        latitude: parseFloat(item["Latitud"].replace(',', '.')),
        longitude: parseFloat(item["Longitud (WGS84)"].replace(',', '.')),
        gas95: parseFloat(item["Precio Gasolina 95 E5"]?.replace(',', '.') || null),
        gas98: parseFloat(item["Precio Gasolina 98 E5"]?.replace(',', '.') || null),
        diesel: parseFloat(item["Precio Gasoleo A"]?.replace(',', '.') || null),
        schedule: item["Horario"]
    }));
}


document.addEventListener("DOMContentLoaded", async () => {


    const map = generateMap('map', 40, -1, 6);
    const addGasStationsFunction = addGasStations(map);
    const provinciasMap = new Map();
    const rightColumn = document.querySelector('#right');

    const provincias = await getProvincias();
    const selectProvincias = renderProvincias(provincias)
    rightColumn.appendChild(selectProvincias);
    selectProvincias.addEventListener('changeFilters', async (event) => {
        const { provincia, gasType, priceRange } = event.detail;
        let gasStations = [];

        if (provinciasMap.has(provincia)) {
            gasStations = provinciasMap.get(provincia)
        }
        else {
            gasStations = await getGasData(provincia);
            gasStations = normalizeStationData(gasStations);
            provinciasMap.set(provincia, gasStations);
        }
        
        const bestGasStations = getBestGasStations(gasStations, gasType, priceRange);
         addGasStationsFunction(bestGasStations);   
    });

});