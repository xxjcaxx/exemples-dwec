export const _ = {
    compose: (...fns) => x => fns.reduceRight(async(v, f) => f(await v), x),
    json: (request) => request.json(),
    getURL: async (url) =>  _.compose(_.json,fetch)(url),
    fillContainer: (container) => (divList) => { container.append(divList); return container;}
}
