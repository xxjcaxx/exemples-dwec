export {ordernarArray,mostrarEstat}

const ordernarArray = (array) => array.toSorted((a, b) => a - b);

const mostrarEstat = (sortedEstat) => 
    stringEstat = sortedEstat.map(i => ""+i).join('')
