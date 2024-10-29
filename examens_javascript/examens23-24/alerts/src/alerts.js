export { getAlerts, manageAlerts, renderAlerts }


let interval = null;

async function getAlerts(url) {
    return (await (await fetch(url)).json()).data.map(a => a.attributes);
}

function manageAlerts(url, time, callback, filterFunction) {
    return setInterval(async () => {
        callback((await getAlerts(url)).filter(filterFunction));
    }, time);
}

function renderAlerts(alerts) {
    const container = document.createElement('div');
    container.style = "display: flex; flex-wrap: wrap;";

    let causes = [...new Set(alerts.map(a => a.cause))];
    let colorArray = ['#FF6633', '#E6FF80', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    let causesDiv = document.createElement('div');
    causesDiv.style = 'width:100%';
    const clearButton = document.createElement('button');
    clearButton.innerHTML = 'Clear Filter';
    clearButton.addEventListener('click', () => window.location.hash = '#/')
    causesDiv.append(...causes.map(c => {
        let button = document.createElement('button');
        button.innerHTML = c;
        button.addEventListener('click', () => {
            window.location.hash = '#/?filter=' + c;
        });
        return button;
    }), clearButton
    );

    container.innerHTML = alerts.map(alert => `<div 
    style="width: 300px; margin: 10px; padding: 10px; border: 1px solid #555;
    background-color: ${colorArray[causes.indexOf(alert.cause)]} 
    ">
    <h2>${alert.header}</h2>
    <p>${alert.created_at}</p>
    <p>${alert.description}</p>
    <p>${alert.cause}</p>
</div>`).join('');
    container.prepend(causesDiv);

    return container;
}



function route(uri) {
    clearInterval(interval);
    let filter = uri.split('?')[1];
    filter = filter ? filter.split('=')[1] : false;
    uri = '#/';
    switch (uri) {
        case '#/':
            console.log(interval);
            let container = document.querySelector('#container');
           
            interval = manageAlerts(
                'https://api-v3.mbta.com/alerts?sort=-created_at&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE',
                1000,
                alerts => {
                    container.innerHTML = '';
                    container.append(renderAlerts(alerts))
                },
                filter ? (alert) => alert.cause === filter : (alert) => true,
            )
            break;
        case '':
            window.location.hash = '#/';
            break;
        default:
            window.location.hash = '#/';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    route(window.location.hash);
    window.addEventListener('hashchange', () => {
        route(window.location.hash);
    });
});

