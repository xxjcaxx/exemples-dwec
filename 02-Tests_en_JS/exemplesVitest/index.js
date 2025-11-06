export const numeric = (a, b) => typeof a === "number" && typeof b === "number" ? a + b : NaN;

export const arrays = (a, b) => [
    ...(Array.isArray(a) ? a : (a != null ? [a] : [])),
    ...(Array.isArray(b) ? b : (b != null ? [b] : []))
];

export const objectes = (a, b) => ({ a, b });

export const promeses = (a, b) => ([Promise.resolve(a), Promise.resolve(b)]);

export const promeses2 = (a, b) => ([
    new Promise(resolve => {
        Math.random() > 0.5 && resolve(a)
    }),
    new Promise(resolve => {
        Math.random() > 0.5 && resolve(b)
    })
]);

export const promeses3 = (a, b) => ([
    new Promise((resolve, reject) => {
        Math.random() > 0.5 && resolve(a) || reject(new Error(a))
    }),
    new Promise((resolve, reject) => {
        Math.random() > 0.5 && resolve(b) || reject(new Error(b))

    })
]);


export const server = async (url) => {
    try {
        const result = await fetch(url);
        const data = await result.json();
        return data
    }
    catch (error) {
        if(error.message === 'Failed to fetch')
        return error
    }
}
export const serverPost = (url) => (data) => { }
export const serverImage = (url) => { }

export const callback = (callback) => { }
export const domDiv = (content) => { }
export const domEventListener = (div) => (handler) => { }
export const domEventEmit = (div) => (eventName) => (details) => { }
