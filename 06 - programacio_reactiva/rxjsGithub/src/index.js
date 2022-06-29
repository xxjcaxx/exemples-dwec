import {
  Observable,
  of,
  reduce,
  from,
  switchMap,
  map,
  merge,
  mergeWith,
  fromEvent,
  startWith,
  combineLatestWith,
} from "rxjs";

document.addEventListener("DOMContentLoaded", () => {
  // Generem un Observable de strings per anar demanant
  const sources = of("https://api.github.com/users");

  //// El boto de refrescar

  const refreshButton = document.querySelector("#refresh");
  const refreshClickStream = fromEvent(refreshButton, "click");
  const requestClickStream = refreshClickStream.pipe(
    map(() => {
      const randomOffset = Math.floor(Math.random() * 500);
      return "https://api.github.com/users?since=" + randomOffset;
    })
  );

  // Ara tenim dos Observables que fan el mateix:
  // sources que envia un array de URLS
  // requestStream que envia una URL quan fem click

  // El que podem fer és un merge d'Observables per a que done igual d'on viguen

  // const requestStream = requestClickStream.pipe(mergeWith(sources));

  // O més fàcil:
  const requestStream = requestClickStream.pipe(
    startWith("https://api.github.com/users")
  );

  requestStream.subscribe((url) => {
    console.log(url);
      document.querySelector("#container").innerHTML = "";
    // es podria fer async/await
    /*const response = new Observable((observer) => {
      fetch(url)
        .then((r) => r.json())
        .then((data) => observer.next(data));
    });*/

    // Millor convertir la promesa en observable
    const response = from(fetch(url).then(response=>response.json()))
    
    /*.pipe(
      switchMap((response) => response.json())
    );*/
    // amb switchMap, mapeja valors i retorna observables
    //https://stackoverflow.com/questions/57903624/map-vs-switchmap-in-rxjs
    // (No tenim en compte si falla el fetch)
    // Creem un Observable a partir d'una funció asíncrona que retorna una promesa

    //response és un Observable que retorna usuaris
    // Aquest fragment crea una llista dels 100 usuaris demanats aleatoris
    /*  response
      .pipe(
        map((users) =>
          users.map((user) => {
            const divUser = document.createElement("div");
            divUser.innerHTML = `
            <img src="${user.avatar_url}" style="width:200px"/>
            <h2>${user.login}</h2>
            <p>${user.html_url}</p>`;
            return divUser;
          })
        )
      )
      .subscribe((divs) => {
        divs.forEach((d) => document.querySelector("#container").append(d));
      });*/

    // Anem a fer una funció per a retornar un Observable de sugerències a partir de response
    // Aquesta funció crea un stream de sugerències que serà activat cada vegada que tanquem un usuari
    // Per això li passem el stream del botó de tancar

    const divsUsers = [1, 2, 3].map((n) => {
      const divUser = document.createElement("div");
      divUser.id = `divUser-${n}`;
      divUser.innerHTML = `
        <span class="close">X</span>
        <img src="" style="width:200px"/>
        <h2 class="name"></h2>
        <p class="url"></p>`;
      const closeButton = divUser.querySelector(".close");
      divUser.closeClickStream = fromEvent(closeButton, "click");
      divUser.userlogin = divUser.querySelector(".name");
      divUser.avatar_url = divUser.querySelector("img");
      divUser.html_url = divUser.querySelector(".url");
      return divUser;
    });

    divsUsers.forEach((d) => document.querySelector("#container").append(d));

    const createSuggestion = (closeClikStream) => {
        //console.log(closeClikStream);
      const stream = closeClikStream.pipe(
        startWith("Primer Click"),
        combineLatestWith(response),
        map((clickUsers) => {
          
          const user =  clickUsers[1][Math.floor(Math.random() * clickUsers[1].length)];
        
          return user;
        })
      );
      return stream;
    };

    const suggestionStream1 = createSuggestion(divsUsers[0].closeClickStream);
    const suggestionStream2 = createSuggestion(divsUsers[1].closeClickStream);
    const suggestionStream3 = createSuggestion(divsUsers[2].closeClickStream);

    suggestionStream1.subscribe(u=>{
        
        divsUsers[0].userlogin.innerHTML = u.login;
        divsUsers[0].avatar_url.src = u.avatar_url;
        divsUsers[0].html_url.innerHTML = u.html_url;
    })
    suggestionStream2.subscribe(u=>{
        
        divsUsers[1].userlogin.innerHTML = u.login;
        divsUsers[1].avatar_url.src = u.avatar_url;
        divsUsers[1].html_url.innerHTML = u.html_url;
    })
    suggestionStream3.subscribe(u=>{
        
        divsUsers[2].userlogin.innerHTML = u.login;
        divsUsers[2].avatar_url.src = u.avatar_url;
        divsUsers[2].html_url.innerHTML = u.html_url;
    })

  });
});
