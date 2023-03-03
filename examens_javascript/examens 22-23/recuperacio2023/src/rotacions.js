let original = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']; 

const rotations = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8],   
    [0, 3, 6, 1, 4, 7, 2, 5, 8],  
    [6, 3, 0, 7, 4, 1, 8, 5, 2],   
    [6, 7, 8, 3, 4, 5, 0, 1, 2],   
    [8, 7, 6, 5, 4, 3, 2, 1, 0],   
    [8, 5, 2, 7, 4, 1, 6, 3, 0],   
    [2, 5, 8, 1, 4, 7, 0, 3, 6],   
    [2, 1, 0, 5, 4, 3, 8, 7, 6]   
   ];


const rotar = (rotacions) => (original) => rotacions.map(r=> r.map(n => original[n]));

//console.log(JSON.stringify(rotar(rotations)(original)));

const areEquals = (arrayA) => (arrayB) => rotar(rotations)(arrayA).some(A=> A.every((a,i) => a === arrayB[i]))

//console.log(areEquals(["a","b","c","d","e","f","g","h","i"])(["i","f","c","h","e","b","g","d","a"]));
/*
[
["a","b","c","d","e","f","g","h","i"],
["a","d","g","b","e","h","c","f","i"],
["g","d","a","h","e","b","i","f","c"],
["g","h","i","d","e","f","a","b","c"],
["i","h","g","f","e","d","c","b","a"],
["i","f","c","h","e","b","g","d","a"],
["c","f","i","b","e","h","a","d","g"],
["c","b","a","f","e","d","i","h","g"]
]*/