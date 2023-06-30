import './style.css'

const fetchURL = async (URL, route) => {
    let response = await fetch(URL);
    let rawData = await response.json();
    return route.reduce((data, current) => data[current], rawData);
}

const renderTableAlerts = (alerts) => {
    let wrapper = document.createElement('table');
    wrapper.innerHTML =
    alerts.map(alert =>
            `<tr class="alert">
                <td>${alert.attributes.created_at}</td>
                <td>${alert.attributes.cause}</td>
                <td>${alert.attributes.header}</td>
            </tr>`
        ).join('');
    return wrapper.children
}

const renderTable = (alerts) => {

    const orderBy = (alerts) => (field) => [...alerts].sort((a, b) => a.attributes[field] < b.attributes[field] ? -1 : 1)
    const orderAlertsBy = orderBy(alerts);

    const trHeader = document.createElement('tr');
    let table = document.createElement('table');
    table.append(trHeader);

    trHeader.innerHTML = `
        <td>Created At</td>
        <td><button id="buttonCause">Cause</button></td>
        <td><button id="buttonHeader">Header</button></td>`;

    trHeader.querySelector('#buttonCause').addEventListener('click',
        () => {
            table.querySelector('tbody').remove();
            table.append(...renderTableAlerts(orderAlertsBy('cause')));
        });
    trHeader.querySelector('#buttonHeader').addEventListener('click',
        () => {
            table.querySelector('tbody').remove();
            table.append(...renderTableAlerts(orderAlertsBy('header')));
        });
    
    table.append(...renderTableAlerts(alerts));
    return table;
}

const renderAlerts = (container) => (alerts) => {     
    let currentFilter = document.createElement('span');
    currentFilter.innerText = '';
    let causes = [...new Set(alerts.map(alert => alert.attributes.cause))];
    let causesButtons = causes.map(cause => {
        let button = document.createElement('button');
        button.innerText = cause;
        button.addEventListener('click',()=>{
            container.querySelector('table').remove();
            let filteredAlerts = alerts.filter(alert => alert.attributes.cause === cause);
            container.append(renderTable(filteredAlerts));
            currentFilter.innerText = cause;
        });
        return button
    })
    let removeFilters = document.createElement('button');
    removeFilters.innerText = 'Remove Filters';
    removeFilters.addEventListener('click',()=>{
        container.querySelector('table').remove();
        container.append(renderTable(alerts));
        currentFilter.innerText = '';
    });
    let divCausesButton = document.createElement('div');
    divCausesButton.id = 'divButtons';
    divCausesButton.append(...causesButtons,currentFilter,removeFilters);
    container.append(divCausesButton);
    container.append(renderTable(alerts));
}


document.addEventListener('DOMContentLoaded', async () => {

    let alerts = await fetchURL('https://api-v3.mbta.com/alerts?sort=-created_at&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE', ['data']);
    const container = document.querySelector('#container');
    const renderAlertsContainer = renderAlerts(container);
    renderAlertsContainer(alerts);
    setInterval(()=>  renderAlertsContainer(alerts),300000);

})

