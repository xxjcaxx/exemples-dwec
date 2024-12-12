export {appendDivs,createCustomElement,createDivs, createAndAppend, getAndAppend}
import { compose, logInCompose } from "./functionals";


const appendDivs = (container) => (divs) => {
    container.innerHTML ='';
    container.append(...divs);
};

const createCustomElement = (tag) => (data) => {
    const element = document.createElement(tag);
    element.data = data;
    return element;
}

const createDivs = (tag) => (data) => data.map(createCustomElement(tag));


const createAndAppend = ({tag,container}) => 
    compose(
        appendDivs(container),
        createDivs(tag),
    ); 


const getAndAppend = ({getTableFunction, search, tag, container}) => {
    compose(
        createAndAppend({tag,container}),
        logInCompose,
        getTableFunction
    )(search); 
}