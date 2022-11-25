export {createElement};

function createElement(type,params={}){
    const element = document.createElement(type);
    if(params.classes){
     element.classList.add(...params.classes);   
    }
    element.innerHTML = params.innerHTML ? params.innerHTML : '';
    element.append(params.innerElement ? params.innerElement : '');
    element.add = child => { element.append(child); return element};
    return element;
}