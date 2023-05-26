import {
  fromEvent,
  throttleTime,
  from,
  of,
  concatMap,
  filter,
  map,
  delay,
  distinctUntilChanged,
  debounceTime,
  withLatestFrom,
  tap,
  switchMap,
  startWith,
  Subject,
} from "rxjs";
import scroll from "./scroll.png";

document.addEventListener("DOMContentLoaded", () => {
  const myObs = from("Hello world");

  const filteredObs = myObs.pipe(
    //here comes the magic 🙂
    concatMap((char) => of(char).pipe(delay(1000))),
    filter((char) => char != " "),
    map((char) => char.toUpperCase())
  );

  /*
https://enriqueoriol.com/blog/2019/09/aprende-rxjs-4.html
https://swirly.dev/

-Hello,world-|
title=source:

> concatMap()

x = -H----------|

y = --e---------| 

z = ---l--------|

a = ----l-------|

b = -----o------|

c = ------,-----|

h = -------w----|

i = --------o---|

f = ---------r--|

g = ----------l-|

-xyzabchifg-----|

> delay(1000) (i concat del concatMap)

-H---e---l---l---o---,---w---o---r---l---d----|

> filter((char) => char != " ")

-H---e---l---l---o-------w---o---r---l---d----|


> map((char) => char.toUpperCase())

-H---E---L---L---O-------W---O---R---L---D----| 

*/
  const hola = document.querySelector("#hola");
  const subscription = filteredObs.subscribe(
    (char) => (hola.innerHTML += char)
  );

  //////////////// Busqueda

  const fetchStates = (searchStr) => {
    const fetchedStates =
      !searchStr || searchStr.length == 0
        ? //if no search, return observable with all states
          states
        : // otherwise, return matching states
          states.filter((item) =>
            item.toLowerCase().includes(searchStr.toLowerCase())
          );
    return of(fetchedStates).pipe(delay(500));
  };
  const searchBoxElement = document.getElementById("search-box-input");
  const searchBtnElement = document.getElementById("search-box-btn");
  const loadingElement = document.getElementById("loading");
  const resultsElement = document.getElementById("results");

  const loadingSubject = new Subject();
  const loading$ = loadingSubject.asObservable().pipe(startWith(false));
  loading$.subscribe((isLoading) => {
    loadingElement.style.display = isLoading ? "block" : "none";
    resultsElement.style.display = isLoading ? "none" : "block";
  });

  const searchValue$ = fromEvent(searchBoxElement, "keyup").pipe(
    map((event) => event.target.value),
    distinctUntilChanged(), //Per evitar la keyup de majuscules, per exemple
    debounceTime(300) // de respondre cada poc de temps i no saturar la búsqueda
  );

  const searchClick$ = fromEvent(searchBtnElement, "click");

  const search$ = searchClick$.pipe(
    withLatestFrom(searchValue$, (click, search) => search), // es subscriu a search values i es queda en la búsqueda
    startWith(""),
    distinctUntilChanged(),
    tap(() => loadingSubject.next(true)),
    switchMap((search) => fetchStates(search)), // crea un nou observable a partir de la funció que retorna un observable
    // ara passem de tindre un fluxe de texts a un fluxe de resultats
    tap(() => loadingSubject.next(false))
  );

  /* let eventsCount = 0;
  searchValue$.subscribe( search => {
      const divEvents = document.createElement('div');
      divEvents.innerHTML = eventsCount + '-' + search
      resultsElement.append(divEvents);
    eventsCount++;
  });*/

  search$.subscribe((data) => {
    resultsElement.innerHTML = "";
    data.forEach((d) => {
      const divData = document.createElement("div");
      divData.innerHTML = d;
      resultsElement.append(divData);
    });
  });

  /*


-K--KK----------|
title=KeyUp:
 

>  map(event => event.target.value) 

-A--LL----------|

> distinctUntilChanged(),

-A--L-----------|

> debounceTime(300)

-----AL---------|

-----------S----|
title=SearchClick

> withLatestFrom(searchValue$, (click, search) => search ),

-----------AL---|

> tap(() => loadingSubject.next(true)),

x = ------t-----|

z = -------F----|

y = ----------f-|

---------x-z-y--|
title=tap-switchmap-tap

> of(fetchedStates).pipe( delay(500) )

---------------------S---|
title=FetchedStates
*/

  const scrollObservable = fromEvent(document, "scroll").pipe(
  throttleTime(100));
  // Necessitem fer throttle per no tindre massa events seguits i saturar la CPU

  scrollObservable.subscribe((e) => {
    const container = document.querySelector("#container");
    const height = document.documentElement.scrollHeight;
    const hue = (window.scrollY / height) * 360;
    container.style.backgroundColor = `hsl(${hue}, 50%, 50%)`;
    console.log(hue, height, window.pageYOffset, window.scrollY);
  });

  
});

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

