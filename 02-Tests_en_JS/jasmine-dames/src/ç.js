/**
 * Ç és l'espai de noms per a utilitats funcionals
 */


export const ç = {
    compose: (...fns) => x => fns.reduceRight((v, f) => f(v), x),
    map:  (func) => (array) => array.map(func),
    log: (object) => { console.log(object); return(object); },
    join: (separator) => (array) => array.join(separator),
    copy2DArray: (array) => array.map(row => row.map(c => c))
}