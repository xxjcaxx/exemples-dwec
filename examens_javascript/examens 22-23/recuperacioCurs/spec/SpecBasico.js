const lecturasSimple = [
    {
        sensor: 'Sensor1 (Temperatura)',
        lecturas: [
            { valor: 25.6, tiempo: '2023-05-24T08:00:00Z' },
            { valor: 22.1, tiempo: '2023-05-24T08:02:00Z' }
        ]
    },
    {
        sensor: 'Sensor2 (Humedad)',
        lecturas: [
            { valor: 68.2, tiempo: '2023-05-24T08:00:00Z' },
            { valor: 72.5, tiempo: '2023-05-24T08:02:00Z' }
        ]
    }];

const lecturasResumidas = [{ tiempo: '2023-05-24T08:00:00Z', Temperatura: 25.6, Humedad: 68.2 },
{ tiempo: '2023-05-24T08:02:00Z', Temperatura: 22.1, Humedad: 72.5 }];

const lecturasArrayficadas = [['2023-05-24T08:00:00Z', 25.6, 68.2 ], ['2023-05-24T08:02:00Z', 22.1, 72.5 ]];
const statsLecturasSimples = {mitjanes: [23.85,70.35], max: [25.6, 72.5], min: [22.1, 68.2]};

describe("Lecturas", function () {
    describe("Resumir", function () {
        it("Debe resumir las lecturas", function () {
            expect(resumirLecturas(lecturasSimple)).toEqual(lecturasResumidas);
        });

    });
    describe("arrayficar", function () {
        it("Debe arraificar las lecturas", function () {
            expect(arrayficarLecturas(lecturasResumidas)).toEqual(lecturasArrayficadas);
        });

    });

    describe("stats", function () {
        it("Debe obtener estadisticas las lecturas", function () {
            expect(statsLecturas(lecturasArrayficadas)).toEqual(statsLecturasSimples);
        });

    });



});