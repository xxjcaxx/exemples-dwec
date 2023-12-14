import { getAlerts, manageAlerts, renderAlerts } from "../src/alerts.js";

describe('Alerts', function () {
    describe('getAlerts', function () {
        it('should return a promise', function () {
            expect(getAlerts('https://api-v3.mbta.com/alerts?sort=-created_at&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE',
            )).toBeInstanceOf(Promise);
        });
        it('should return an Array', async function () {
            expect(await getAlerts('https://api-v3.mbta.com/alerts?sort=-created_at&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE',
            )).toBeInstanceOf(Array);
        });
        it('should return an Array of Attributes', async function () {
            let alerts = await getAlerts('https://api-v3.mbta.com/alerts?sort=-created_at&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE');
            expect(alerts[0]).toBeInstanceOf(Object);
            expect(['cause', 'description', 'header'].every(key => key in alerts[0])).toBe(true)
        });
    });
    describe('manageAlerts', function () {
        let filterFunction;
        beforeEach(() => {
            filterFunction = jasmine.createSpy('filterFunction').and.returnValue(true);
        });
        it('should return an Interval', function () {
            let interval = manageAlerts('null', 1000, () => { }, () => true);
            expect(interval).toEqual(jasmine.any(Number));
            // El setInterval retorna un número ID de l'interval creat
            clearInterval(interval);
        });
        it('should do at interval', async function () {
            let i = 0;
            let interval = manageAlerts(
                'https://api-v3.mbta.com/alerts?sort=-created_at&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE',
                1000,
                () => { i = i + 1; console.log(i) },
                filterFunction);
            // El setInterval retorna un número ID de l'interval creat
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Provem que s'executa la funció callback
            expect(i).toBe(1);
            // Provem que s'executa la funció de filtre
            expect(filterFunction).toHaveBeenCalled();
            clearInterval(interval);
        });
    });

    describe('renderAlerts', function () {
        it('should return an Element', async function () {
            let alerts = await getAlerts('https://api-v3.mbta.com/alerts?sort=-created_at&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE');
            let divAlerts = renderAlerts(alerts);
            expect(divAlerts).toBeInstanceOf(Element);
        });
    });

});
