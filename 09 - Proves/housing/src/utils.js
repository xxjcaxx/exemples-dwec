// U+3041
export const ぁ = {

    removeAttributes: (arrayObjects) => (arrayAttributes) => 
        arrayObjects.map(object => {
        let objectCopy = {...object};
        arrayAttributes.forEach(a => delete objectCopy[a]);
        return objectCopy
        })
    }


    /*
    
    [{a: 1, b: 2},{a: 1, c: 4}]   ['a']

    [ {b:2},{c: 4}] 


    
    */