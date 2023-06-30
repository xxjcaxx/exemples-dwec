const lecturas = [
    {
      sensor: 'Sensor1 (Temperatura)',
      lecturas: [
        { valor: 25.6, tiempo: '2023-05-24T08:00:00Z' },
        { valor: 22.1, tiempo: '2023-05-24T08:02:00Z' },
        { valor: 19.3, tiempo: '2023-05-24T08:04:00Z' },
        { valor: 21.8, tiempo: '2023-05-24T08:06:00Z' },
        { valor: 23.5, tiempo: '2023-05-24T08:08:00Z' }
      ]
    },
    {
      sensor: 'Sensor2 (Humedad)',
      lecturas: [
        { valor: 68.2, tiempo: '2023-05-24T08:00:00Z' },
        { valor: 72.5, tiempo: '2023-05-24T08:02:00Z' },
        { valor: 71.8, tiempo: '2023-05-24T08:04:00Z' },
        { valor: 69.3, tiempo: '2023-05-24T08:06:00Z' },
        { valor: 70.1, tiempo: '2023-05-24T08:08:00Z' }
      ]
    },
    {
      sensor: 'Sensor3 (Presión)',
      lecturas: [
        { valor: 1012.3, tiempo: '2023-05-24T08:00:00Z' },
        { valor: 1012.8, tiempo: '2023-05-24T08:02:00Z' },
        { valor: 1013.2, tiempo: '2023-05-24T08:04:00Z' },
        { valor: 1012.5, tiempo: '2023-05-24T08:06:00Z' },
        { valor: 1011.9, tiempo: '2023-05-24T08:08:00Z' }
      ]
    },
    {
      sensor: 'Sensor4 (Luz)',
      lecturas: [
        { valor: 120, tiempo: '2023-05-24T08:00:00Z' },
        { valor: 110, tiempo: '2023-05-24T08:02:00Z' },
        { valor: 105, tiempo: '2023-05-24T08:04:00Z' },
        { valor: 115, tiempo: '2023-05-24T08:06:00Z' },
        { valor: 100, tiempo: '2023-05-24T08:08:00Z' }
      ]
    }
  ]

const resumirLecturas = (lecturas) => {
    return [... new Set(lecturas.map(l => l.lecturas.map(L => L.tiempo)).flat())]
    .map(
        t => { 
            return {tiempo: t, ...Object.fromEntries (lecturas.map(
                l => [l.sensor.split('(')[1].split(')')[0], l.lecturas.filter(L => L.tiempo === t)[0].valor]           
                ))}
            }
        )
}

console.log(resumirLecturas(lecturas));

const arrayficarLecturas = (lecturasResumidas) => lecturasResumidas.map(l => Object.values(l));

const statsLecturas = (lecturasArray) => {
    return {
        mitjanes: lecturasArray[0].slice(1).map((sensor,i) => lecturasArray.reduce((acc,current) => acc += current[i+1],0)).map(acc => acc/lecturasArray.length),
        max:      lecturasArray[0].slice(1).map((sensor,i) => lecturasArray.sort((a,b) => a[i+1] < b[i+1] ?  1 : -1)[0][i+1]),
        min:      lecturasArray[0].slice(1).map((sensor,i) => lecturasArray.sort((a,b) => a[i+1] > b[i+1] ?  1 : -1)[0][i+1])
    }
}

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)


compose(lecturas=> console.log(lecturas),statsLecturas,arrayficarLecturas,resumirLecturas)(lecturas)

