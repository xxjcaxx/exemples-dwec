// U+3041
export const ぁ = {

    removeAttributes: (arrayObjects) => (arrayAttributes) => 
        arrayObjects.map(object => {
        let objectCopy = {...object};
        arrayAttributes.forEach(a => delete objectCopy[a]);
        return objectCopy
        })
    }
