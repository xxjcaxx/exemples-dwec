document.addEventListener("DOMContentLoaded",()=>{


    const container = document.querySelector('#container');

    fetch("https://rickandmortyapi.com/api/character")
    .then(response => response.json())
    .then(data => { 
        console.log(data);
        const episodesSet = new Set()
        
        const divCharacters = data.results.map(c => `
            <div data-id="${c.id}">
            <h2>${c.name}</h2>
            <img src="${c.image}">
            <ul>
            ${
                c.episode.map(e=> {
                    episodesSet.add(e)
                    return `<li data-episode="${e}"> ▩▩▩▩▩▩▩▩▩▩▩▩</li>`
                }).join('')
            }
            </ul>
            </div>
            `)
            .join('');
        container.innerHTML = divCharacters;
        return episodesSet;
    })
    .then((episodesSet)=>{
        console.log(episodesSet);
       /* for(let e of episodesSet){
            fetch(e).then(response => response.json())
            .then(data => {
                container.querySelectorAll(`[data-episode="${e}"]`)
                .forEach(li => li.innerText = data.name)
               
            })
        }*/

        const episodesPromises = [...episodesSet].map(e => fetch(e).then(response => response.json()));
        Promise.all(episodesPromises)
        .then(episodesData => episodesData.forEach(e=>   
            container.querySelectorAll(`[data-episode="${e.url}"]`)
                .forEach(li => li.innerText = e.name) ))     
    })
    ;


});