import {
  audit,
  debounceTime,
  filter,
  skip,
  delay,
  scan,
  take,
  from,
  tap,
  fromEvent,
  interval,
  map,
  of,
  range,
  takeUntil,
  timer,
  takeWhile,
  last,
  takeLast,
  first,
  reduce,
  sampleTime,
  auditTime,
  throttleTime,
  throttle,
  Subject,
  share,
  bufferTime,
  buffer,
  debounce,
  sample,
  zip,
  merge,
  concat,
  forkJoin,
  combineLatest,
  withLatestFrom,
  mergeAll,
  mergeMap,
  switchMap,
  concatMap,
} from "rxjs";
export const categories = [
  {
    id: "creation",
    name: "Operadors de creació",
    description: "Permeten crear un observable a partir de qualsevol cosa. ",
  },
  {
    id: "operators",
    name: "Operadors bàsics",
    description: "Dins dels pipes, podem manipular el fluxe de dades.",
  },
  {
    id: "combinators",
    name: "Combinació d'observables",
    description:
      "Funcions que retornen observables mesclant altres observables",
  },
  {
    id: "HHO",
    name: "High Order Observables HOO",
    description: "Observables que emeten observables",
  },
];

export const exemples = [
  {
    category: "creation",
    id: "exemple1",
    name: "fromEvent():",
    description: `Crea un observable a partir d'un esdeveniment. En l'exemple podem observar cóm fent scroll es modifica el número del costat. S'ha afegit un 
    operador debonceTime per a no saturar el navegador en massa esdeveniments`,
    htmlExemple: `<div id="exemple1">
        <div style="height: 1000px"></div>
      </div>
      <span id="exemple1info">0</span>`,
    htmlCode: `
      <div class="exempleCode" >
      <pre
        style="margin: 0; line-height: 125%"
      ><span style="color: #008800; font-weight: bold">const</span> divExemple1 <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#exemple1&quot;</span>);
fromEvent(divExemple1, <span style="background-color: #fff0f0">&quot;scroll&quot;</span>)
.pipe
(
debounceTime(<span style="color: #0000DD; font-weight: bold">10</span>)
)
.subscribe((event) <span style="color: #333333">=&gt;</span> {
<span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&#39;#exemple1info&#39;</span>).innerHTML <span style="color: #333333">=</span> event.target.scrollTop;
});
</pre>
    </div>
      `,
    method: () => {
      const divExemple1 = document.querySelector("#exemple1");
      fromEvent(divExemple1, "scroll")
        .pipe(debounceTime(10))
        .subscribe((event) => {
          document.querySelector("#exemple1info").innerHTML =
            event.target.scrollTop;
        });
    },
  },

  {
    category: "creation",
    id: "exemple2",
    name: "of():",
    description: `Crea un observable a partir d'un llista de paràmetres`,
    htmlExemple: ` <div id="exemple2">
        <span id="exemple2info"></span>
      </div>`,
    htmlCode: `
      <div
      class="exempleCode"
    >
      <pre
        style="margin: 0; line-height: 125%"
      ><span style="color: #008800; font-weight: bold">const</span> source <span style="color: #333333">=</span> of(<span style="color: #0000DD; font-weight: bold">1</span>, <span style="color: #0000DD; font-weight: bold">2</span>, <span style="color: #0000DD; font-weight: bold">3</span>, <span style="color: #0000DD; font-weight: bold">4</span>, <span style="color: #0000DD; font-weight: bold">5</span>);
<span style="color: #008800; font-weight: bold">const</span> subscribe <span style="color: #333333">=</span> source.subscribe(val <span style="color: #333333">=&gt;</span> 
<span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&#39;#exemple2info&#39;</span>).innerHTML <span style="color: #333333">+=</span> val);
</pre>
    </div>
      `,
    method: () => {
      const source = of(1, 2, 3, 4, 5);
      const subscribe = source.subscribe(
        (val) => (document.querySelector("#exemple2info").innerHTML += val)
      );
    },
  },

  {
    category: "creation",
    id: "exemple3",
    name: "from():",
    description: `Transforma qualsevol promesa o iterable en un observable. Fes click i veruràs com funciona`,
    htmlExemple: `  <div id="exemple3">
    <span id="exemple3info">Fes-me Click</span>
  </div>`,
    htmlCode: `
    <div
    class="exempleCode"
            >
              <pre
                style="margin: 0; line-height: 125%"
              ><span style="color: #008800; font-weight: bold">const</span> spanExemple3 <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#exemple3info&quot;</span>);
<span style="color: #008800; font-weight: bold">const</span> promesaClick <span style="color: #333333">=</span> <span style="color: #008800; font-weight: bold">new</span> Promise((resolve) <span style="color: #333333">=&gt;</span>
spanExemple3.addEventListener(<span style="background-color: #fff0f0">&quot;click&quot;</span>, () <span style="color: #333333">=&gt;</span> resolve())
);
from(promesaClick).subscribe(() <span style="color: #333333">=&gt;</span> (spanExemple3.innerHTML <span style="color: #333333">=</span> <span style="background-color: #fff0f0">&quot;Click!&quot;</span>));
</pre>
            </div>
  `,
    method: () => {
      const spanExemple3 = document.querySelector("#exemple3info");
      const promesaClick = new Promise((resolve) =>
        spanExemple3.addEventListener("click", () => resolve())
      );
      from(promesaClick).subscribe(() => (spanExemple3.innerHTML = "Click!"));
    },
  },
  {
    category: "creation",
    id: "exemple4",
    name: "range():",
    description: ` Crea un Observable que dona una serie de números en un interval`,
    htmlExemple: ` <div id="exemple4">
        <span id="exemple4info">0</span>
      </div>`,
    htmlCode: `
        <div
        class="exempleCode"
            >
              <pre
                style="margin: 0; line-height: 125%"
              >  <span style="color: #008800; font-weight: bold">const</span> spanExemple4 <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#exemple4info&quot;</span>);
  range(<span style="color: #0000DD; font-weight: bold">1</span>, <span style="color: #0000DD; font-weight: bold">100</span>).subscribe((n) <span style="color: #333333">=&gt;</span> (spanExemple4.innerHTML <span style="color: #333333">+=</span> <span style="color: #FF0000; background-color: #FFAAAA">'</span> '+n+'<span style="color: #FF0000; background-color: #FFAAAA">'</span>));
</pre>
            </div>
  `,
    method: () => {
      const spanExemple4 = document.querySelector("#exemple4info");
      range(1, 100).subscribe((n) => (spanExemple4.innerHTML += ` ${n}`));
    },
  },

  {
    category: "creation",
    id: "interval",
    name: "interval() i timer():",
    description: ` Crea un observable que va donant números consecutius cada cert temps. Timer dona un valor quan passa un temps.
      En aquest exemple l'utilitzem per a parar l'interval`,
    htmlExemple: ` <div id="interval">
      <span id="intervalinfo">0</span>
    </div>`,
    htmlCode: `
    <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"> () <span style="color: #333333">=&gt;</span> {
      <span style="color: #008800; font-weight: bold">const</span> spanExemple <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#interval&quot;</span>);
      <span style="color: #008800; font-weight: bold">const</span> subscription <span style="color: #333333">=</span> interval(<span style="color: #0000DD; font-weight: bold">1000</span>).subscribe((n) <span style="color: #333333">=&gt;</span> (spanExemple.innerHTML <span style="color: #333333">+=</span> <span style="color: #FF0000; background-color: #FFAAAA"></span>n<span style="color: #FF0000; background-color: #FFAAAA"></span>));
      timer(<span style="color: #0000DD; font-weight: bold">20000</span>).subscribe(() <span style="color: #333333">=&gt;</span> subscription.unsubscribe())
    }
</pre></div>


`,
    method: () => {
      const spanExemple = document.querySelector("#interval");
      const subscription = interval(1000).subscribe(
        (n) => (spanExemple.innerHTML += ` ${n}`)
      );
      timer(20000).subscribe(() => subscription.unsubscribe());
    },
  },
  {
    category: "operators",
    id: "map",
    name: "map()",
    description: `Aquest operador és molt simple. Sols mapeja un esdeveniment en la funció que li diguem`,
    htmlExemple: ` <div id="map">
      <span id="maptoinfo"></span>
    </div>`,
    htmlCode: `
    <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"> () <span style="color: #333333">=&gt;</span> {
      <span style="color: #008800; font-weight: bold">const</span> spanExemple <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#map&quot;</span>);
      <span style="color: #008800; font-weight: bold">const</span> subscription <span style="color: #333333">=</span> interval(<span style="color: #0000DD; font-weight: bold">1000</span>).pipe(
        map(n <span style="color: #333333">=&gt;</span> n<span style="color: #333333">**</span><span style="color: #0000DD; font-weight: bold">2</span>)
      ).subscribe((n) <span style="color: #333333">=&gt;</span> (spanExemple.innerHTML <span style="color: #333333">+=</span> <span style="color: #FF0000; background-color: #FFAAAA"></span> n<span style="color: #FF0000; background-color: #FFAAAA"></span>));
      timer(<span style="color: #0000DD; font-weight: bold">20000</span>).subscribe(() <span style="color: #333333">=&gt;</span> subscription.unsubscribe())
    }
</pre></div>


`,
    method: () => {
      const spanExemple = document.querySelector("#map");
      const subscription = interval(1000)
        .pipe(map((n) => n ** 2))
        .subscribe((n) => (spanExemple.innerHTML += ` ${n}`));
      timer(20000).subscribe(() => subscription.unsubscribe());
    },
  },
  {
    category: "operators",
    id: "filter",
    name: "filter()",
    description: `L'operador filter accepta una funció que ha de retornar vertader o fals si passa el filtre`,
    htmlExemple: ` <div id="filter">
      <span id="filterinfo"></span>
    </div>`,
    htmlCode: `
    <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">() <span style="color: #333333">=&gt;</span> {
      <span style="color: #008800; font-weight: bold">const</span> spanExemple <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#filter&quot;</span>);
      <span style="color: #008800; font-weight: bold">const</span> subscription <span style="color: #333333">=</span> interval(<span style="color: #0000DD; font-weight: bold">1000</span>).pipe(
        filter(n <span style="color: #333333">=&gt;</span> n<span style="color: #333333">%</span><span style="color: #0000DD; font-weight: bold">2</span> <span style="color: #333333">==</span> <span style="color: #0000DD; font-weight: bold">0</span>)
      ).subscribe((n) <span style="color: #333333">=&gt;</span> (spanExemple.innerHTML <span style="color: #333333">+=</span> <span style="background-color: #fff0f0">&#39; &#39;</span><span style="color: #333333">+</span>n));
      timer(<span style="color: #0000DD; font-weight: bold">20000</span>).subscribe(() <span style="color: #333333">=&gt;</span> subscription.unsubscribe())
    }
</pre></div>



`,
    method: () => {
      const spanExemple = document.querySelector("#filter");
      const subscription = interval(1000)
        .pipe(filter((n) => n % 2 == 0))
        .subscribe((n) => (spanExemple.innerHTML += " " + n));
      timer(20000).subscribe(() => subscription.unsubscribe());
    },
  },

  {
    category: "operators",
    id: "tap",
    name: "tap()",
    description: `Permet fer efectes col·laterals amb els valors actuals del fluxe de dades. Permet fer console.log o modificar variables o el DOM`,
    htmlExemple: ` <div id="tap">
      <span id="tapinfo">0</span>
    </div>`,
    htmlCode: `
    <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"> () <span style="color: #333333">=&gt;</span> {
      <span style="color: #008800; font-weight: bold">const</span> spanExemple <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#tap&quot;</span>);
      <span style="color: #008800; font-weight: bold">const</span> subscription <span style="color: #333333">=</span> interval(<span style="color: #0000DD; font-weight: bold">1000</span>).pipe(
        tap(n <span style="color: #333333">=&gt;</span> console.log(n))
      ).subscribe((n) <span style="color: #333333">=&gt;</span> (spanExemple.innerHTML <span style="color: #333333">+=</span> <span style="background-color: #fff0f0">&#39; &#39;</span><span style="color: #333333">+</span>n));
      timer(<span style="color: #0000DD; font-weight: bold">20000</span>).subscribe(() <span style="color: #333333">=&gt;</span> subscription.unsubscribe())
    }
</pre></div>

`,
    method: () => {
      const spanExemple = document.querySelector("#tap");
      const subscription = interval(1000)
        .pipe
        // tap(n => console.log(n))
        ()
        .subscribe((n) => (spanExemple.innerHTML += " " + n));
      timer(20000).subscribe(() => subscription.unsubscribe());
    },
  },

  {
    category: "operators",
    id: "first",
    name: "first(), take(), takeWhile(), last(), takeLast(), skip()",
    description: `Tots aquests operadors permeten parar l'obsevable quan es rep una quantitat o fins a que s'arriba a una condició o 
    treure els últims una vegada és completat`,
    htmlExemple: ` <div id="first">
      
    </div>`,
    htmlCode: `
    <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"> () <span style="color: #333333">=&gt;</span> {
      <span style="color: #008800; font-weight: bold">const</span> spanExemple <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#first&quot;</span>);
      <span style="color: #008800; font-weight: bold">const</span> subscription <span style="color: #333333">=</span> interval(<span style="color: #0000DD; font-weight: bold">1000</span>).pipe(
        take(<span style="color: #0000DD; font-weight: bold">10</span>),
        tap(n<span style="color: #333333">=&gt;</span> console.log(n)),
        takeWhile(n <span style="color: #333333">=&gt;</span> n <span style="color: #333333">&lt;</span> <span style="color: #0000DD; font-weight: bold">9</span>),
        tap(n<span style="color: #333333">=&gt;</span> console.log(n)),
        takeLast(<span style="color: #0000DD; font-weight: bold">8</span>),
        skip(<span style="color: #0000DD; font-weight: bold">7</span>),
        first()
      ).subscribe((n) <span style="color: #333333">=&gt;</span> (spanExemple.innerHTML <span style="color: #333333">+=</span> <span style="background-color: #fff0f0">&#39; &#39;</span><span style="color: #333333">+</span>n));
      timer(<span style="color: #0000DD; font-weight: bold">20000</span>).subscribe(() <span style="color: #333333">=&gt;</span> subscription.unsubscribe())
    }
</pre></div>

`,
    method: () => {
      const spanExemple = document.querySelector("#first");
      const subscription = interval(1000)
        .pipe(
          take(10),
          // tap(n=> console.log(n)),
          takeWhile((n) => n < 9),
          // tap(n=> console.log(n)),
          takeLast(8),
          skip(7),
          first()
        )
        .subscribe((n) => (spanExemple.innerHTML += " " + n));
      timer(20000).subscribe(() => subscription.unsubscribe());
    },
  },

  {
    category: "operators",
    id: "reduce",
    name: "reduce()",
    description: `A l'igual que el reduce dels arrays, permet fer un càlcul en les dades que arriben.`,
    htmlExemple: ` <div id="reduce">
      
    </div>`,
    htmlCode: `
    <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">() <span style="color: #333333">=&gt;</span> {
      <span style="color: #008800; font-weight: bold">const</span> spanExemple <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#reduce&quot;</span>);
      <span style="color: #008800; font-weight: bold">const</span> subscription <span style="color: #333333">=</span> interval(<span style="color: #0000DD; font-weight: bold">100</span>).pipe(
        take(<span style="color: #0000DD; font-weight: bold">10</span>),
      reduce((acumulador,actual)<span style="color: #333333">=&gt;</span> acumulador<span style="color: #333333">+</span> actual)
      ).subscribe((n) <span style="color: #333333">=&gt;</span> (spanExemple.innerHTML <span style="color: #333333">+=</span> <span style="background-color: #fff0f0">&#39; &#39;</span><span style="color: #333333">+</span>n));
      timer(<span style="color: #0000DD; font-weight: bold">20000</span>).subscribe(() <span style="color: #333333">=&gt;</span> subscription.unsubscribe())
    }
</pre></div>


`,
    method: () => {
      const spanExemple = document.querySelector("#reduce");
      const subscription = interval(100)
        .pipe(
          take(10),
          reduce((acumulador, actual) => acumulador + actual)
        )
        .subscribe((n) => (spanExemple.innerHTML += " " + n));
      timer(20000).subscribe(() => subscription.unsubscribe());
    },
  },

  {
    category: "operators",
    id: "scan",
    name: "scan()",
    description: `
    Executa una funció amb l'esdeveniment, però té en compte també un històric
    Al contrari de reduce, no espera al final.
    `,
    htmlExemple: ` <div id="scan"></div>`,
    htmlCode: `
    <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">() <span style="color: #333333">=&gt;</span> {
      <span style="color: #008800; font-weight: bold">const</span> spanExemple <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#scan&quot;</span>);
      <span style="color: #008800; font-weight: bold">const</span> subscription <span style="color: #333333">=</span> interval(<span style="color: #0000DD; font-weight: bold">100</span>).pipe(
        
      scan((acumulador,actual)<span style="color: #333333">=&gt;</span> acumulador<span style="color: #333333">+</span> actual)
      ).subscribe((n) <span style="color: #333333">=&gt;</span> (spanExemple.innerHTML <span style="color: #333333">+=</span> <span style="background-color: #fff0f0">&#39; &#39;</span><span style="color: #333333">+</span>n));
      timer(<span style="color: #0000DD; font-weight: bold">20000</span>).subscribe(() <span style="color: #333333">=&gt;</span> subscription.unsubscribe())
    }
</pre></div>

`,
    method: () => {
      const spanExemple = document.querySelector("#scan");
      const subscription = interval(100)
        .pipe(scan((acumulador, actual) => acumulador + actual))
        .subscribe((n) => (spanExemple.innerHTML += " " + n));
      timer(20000).subscribe(() => subscription.unsubscribe());
    },
  },

  {
    category: "operators",
    id: "sampleTime",
    name: "sampleTime()",
    description: `
Hi ha molts operadors temporals: <br/> 
sampleTime(): Emet el valor més recent en eixe interval de temps si hi ha nous valors.
throttleTime(): Emet l'esdeveniment, espera el temps indicat i espera el següent esdeveniment.
auditTime(): Quan arriba un esdeveniment, espera el temps indicat i emet la mostra més recent

`,
    htmlExemple: ` 
    <div id="sampleTime">
        <div style="height: 1000px"></div>
      </div>
      <span id="sampleTimeinfo">0</span>
    `,
    htmlCode: `
    <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"> () <span style="color: #333333">=&gt;</span> {
      <span style="color: #008800; font-weight: bold">const</span> spanExemple <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#sampleTime&quot;</span>);
      fromEvent(spanExemple, <span style="background-color: #fff0f0">&quot;scroll&quot;</span>)
      .pipe(
        tap((e)<span style="color: #333333">=&gt;</span> console.log(<span style="background-color: #fff0f0">&#39;[Scroll event]:&#39;</span><span style="color: #333333">+</span> e.target.scrollTop)),
        sampleTime(<span style="color: #0000DD; font-weight: bold">100</span>),
        tap((e)<span style="color: #333333">=&gt;</span> console.log(<span style="background-color: #fff0f0">&#39;[Scroll]: &#39;</span><span style="color: #333333">+</span> e.target.scrollTop)),
        )
      .subscribe((event) <span style="color: #333333">=&gt;</span> {
        <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#sampleTimeinfo&quot;</span>).innerHTML <span style="color: #333333">=</span>
          event.target.scrollTop;
      });
    }
</pre></div>


`,
    method: () => {
      const spanExemple = document.querySelector("#sampleTime");
      fromEvent(spanExemple, "scroll")
        .pipe(
          tap((e) => console.log("[Scroll event]:" + e.target.scrollTop)),
          throttleTime(100),
          tap((e) => console.log("[Scroll]: " + e.target.scrollTop))
        )
        .subscribe((event) => {
          document.querySelector("#sampleTimeinfo").innerHTML =
            event.target.scrollTop;
        });
    },
  },

  {
    category: "operators",
    id: "comparativaTime",
    name: "Comparativa entre els diferents operadors temporals",
    description: `
La primera línia és cada instant.<br>
La segona línia són esdeveniments aleatoris als que ens subscribim<br>
La tercera línia és en sampleTime:
 Quan passa el temps indicat, treu l'últim esdeveniment. Per això va en retràs.<br>
La quarta línia és en auditTime: Quan arriba un esdeveniment, comença a esperar i després treu l'últim i espera al següent.<br>
La quinta és throttleTime: Emet l'esdeveniment immediat quan passa el temps indicat i si ha arribat algun esdeveniment. Es pot veure que no emet res al final.<br>
La sexta és Delay, que retrasa els esdeveniments un temps.<br>
La septima és més rara, ja que va fent un buffer i, per tant, sols pot canviar el color quan el buffer és d'un element.<br>
La octava és devonceTime: Espera un temps determinat a partir de l'últim esdeveniment si no ha arribat cap mentres tant.<br>
`,
    htmlExemple: ` 
    <div id="comparativaTime">
      <div id="comparativaTimeAll"><div class="hover">Tots els instants</div></div>
      <div id="comparativaTimeEvent"><div class="hover">Events Aleatoris</div></div>
      <div id="comparativaTimeSample"><div class="hover">SampleTime</div></div>
      <div id="comparativaTimeAudit"><div class="hover">AuditTime</div></div>
      <div id="comparativaTimeThr"><div class="hover">ThrottleTime</div></div>
      <div id="comparativaTimeDelay"><div class="hover">Delay</div></div>
      <div id="comparativaTimeBuffer"><div class="hover">Buffer</div></div>
      <div id="comparativaTimeDebounce"><div class="hover">Debounce Time</div></div>
      </div>
  
    `,
    htmlCode: `
    <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">() <span style="color: #333333">=&gt;</span> {

      <span style="color: #008800; font-weight: bold">const</span> createDiv <span style="color: #333333">=</span> (h, s, l, id, container) <span style="color: #333333">=&gt;</span> {
        <span style="color: #008800; font-weight: bold">const</span> div <span style="color: #333333">=</span> <span style="color: #007020">document</span>.createElement(<span style="background-color: #fff0f0">&#39;div&#39;</span>);
        div.id <span style="color: #333333">=</span> id;
        div.style.backgroundColor <span style="color: #333333">=</span> <span style="background-color: #fff0f0">&#39;hsl(&#39;</span> <span style="color: #333333">+</span> h <span style="color: #333333">+</span> <span style="background-color: #fff0f0">&#39;, &#39;</span> <span style="color: #333333">+</span> s <span style="color: #333333">+</span> <span style="background-color: #fff0f0">&#39;%, &#39;</span> <span style="color: #333333">+</span> l <span style="color: #333333">+</span> <span style="background-color: #fff0f0">&#39;%)&#39;</span>;
        <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&#39;#&#39;</span> <span style="color: #333333">+</span> container).append(div);
      }

      <span style="color: #008800; font-weight: bold">const</span> printPosition <span style="color: #333333">=</span> (initialTime, id, n) <span style="color: #333333">=&gt;</span> {
        <span style="color: #008800; font-weight: bold">const</span> now <span style="color: #333333">=</span> <span style="color: #007020">Date</span>.now();
        <span style="color: #008800; font-weight: bold">const</span> position <span style="color: #333333">=</span> <span style="color: #007020">Math</span>.floor((now <span style="color: #333333">-</span> initialTime) <span style="color: #333333">/</span> <span style="color: #0000DD; font-weight: bold">100</span>) <span style="color: #333333">-</span> <span style="color: #0000DD; font-weight: bold">1</span>;
        <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&#39;#&#39;</span> <span style="color: #333333">+</span> id <span style="color: #333333">+</span> <span style="background-color: #fff0f0">&#39;&#39;</span> <span style="color: #333333">+</span> position).style.backgroundColor <span style="color: #333333">=</span> <span style="background-color: #fff0f0">&#39;hsl(&#39;</span> <span style="color: #333333">+</span> n <span style="color: #333333">+</span> <span style="background-color: #fff0f0">&#39;, 100%, 50%)&#39;</span>;
      }

      <span style="color: #008800; font-weight: bold">const</span> createSubscription <span style="color: #333333">=</span> (subjectOrigin, operator, id, initialTime) <span style="color: #333333">=&gt;</span> {
        <span style="color: #008800; font-weight: bold">const</span> subj <span style="color: #333333">=</span> <span style="color: #008800; font-weight: bold">new</span> Subject();
        <span style="color: #008800; font-weight: bold">const</span> subs <span style="color: #333333">=</span> subjectOrigin.pipe(operator).subscribe(subj);
        <span style="color: #008800; font-weight: bold">const</span> subs2 <span style="color: #333333">=</span> subj.subscribe(n <span style="color: #333333">=&gt;</span> printPosition(initialTime, id, n))
        timer(<span style="color: #0000DD; font-weight: bold">10000</span>).subscribe(() <span style="color: #333333">=&gt;</span> {
          subs.unsubscribe();
          subs2.unsubscribe();
        });
        <span style="color: #008800; font-weight: bold">return</span> subj;
      }


      <span style="color: #008800; font-weight: bold">for</span> (<span style="color: #008800; font-weight: bold">let</span> n <span style="color: #333333">=</span> <span style="color: #0000DD; font-weight: bold">0</span>; n <span style="color: #333333">&lt;</span> <span style="color: #0000DD; font-weight: bold">100</span>; n<span style="color: #333333">++</span>) {
        createDiv(n <span style="color: #333333">*</span> <span style="color: #0000DD; font-weight: bold">10</span>, <span style="color: #0000DD; font-weight: bold">100</span>, <span style="color: #0000DD; font-weight: bold">50</span>, <span style="background-color: #fff0f0">&#39;divAll&#39;</span> <span style="color: #333333">+</span> n, <span style="background-color: #fff0f0">&#39;comparativaTimeAll&#39;</span>);
        createDiv(<span style="color: #0000DD; font-weight: bold">0</span>, <span style="color: #0000DD; font-weight: bold">0</span>, <span style="color: #0000DD; font-weight: bold">100</span>, <span style="background-color: #fff0f0">&#39;divEvent&#39;</span> <span style="color: #333333">+</span> n, <span style="background-color: #fff0f0">&#39;comparativaTimeEvent&#39;</span>);
        createDiv(<span style="color: #0000DD; font-weight: bold">0</span>, <span style="color: #0000DD; font-weight: bold">0</span>, <span style="color: #0000DD; font-weight: bold">100</span>, <span style="background-color: #fff0f0">&#39;divSample&#39;</span> <span style="color: #333333">+</span> n, <span style="background-color: #fff0f0">&#39;comparativaTimeSample&#39;</span>);
        createDiv(<span style="color: #0000DD; font-weight: bold">0</span>, <span style="color: #0000DD; font-weight: bold">0</span>, <span style="color: #0000DD; font-weight: bold">100</span>, <span style="background-color: #fff0f0">&#39;divAudit&#39;</span> <span style="color: #333333">+</span> n, <span style="background-color: #fff0f0">&#39;comparativaTimeAudit&#39;</span>);
        createDiv(<span style="color: #0000DD; font-weight: bold">0</span>, <span style="color: #0000DD; font-weight: bold">0</span>, <span style="color: #0000DD; font-weight: bold">100</span>, <span style="background-color: #fff0f0">&#39;divThr&#39;</span> <span style="color: #333333">+</span> n, <span style="background-color: #fff0f0">&#39;comparativaTimeThr&#39;</span>);
        createDiv(<span style="color: #0000DD; font-weight: bold">0</span>, <span style="color: #0000DD; font-weight: bold">0</span>, <span style="color: #0000DD; font-weight: bold">100</span>, <span style="background-color: #fff0f0">&#39;divDelay&#39;</span> <span style="color: #333333">+</span> n, <span style="background-color: #fff0f0">&#39;comparativaTimeDelay&#39;</span>);
        createDiv(<span style="color: #0000DD; font-weight: bold">0</span>, <span style="color: #0000DD; font-weight: bold">0</span>, <span style="color: #0000DD; font-weight: bold">100</span>, <span style="background-color: #fff0f0">&#39;divBuffer&#39;</span> <span style="color: #333333">+</span> n, <span style="background-color: #fff0f0">&#39;comparativaTimeBuffer&#39;</span>);
        createDiv(<span style="color: #0000DD; font-weight: bold">0</span>, <span style="color: #0000DD; font-weight: bold">0</span>, <span style="color: #0000DD; font-weight: bold">100</span>, <span style="background-color: #fff0f0">&#39;divDebounce&#39;</span> <span style="color: #333333">+</span> n, <span style="background-color: #fff0f0">&#39;comparativaTimeDebounce&#39;</span>);
      }

      <span style="color: #008800; font-weight: bold">const</span> spanExemple <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#comparativaTime&quot;</span>);
      <span style="color: #008800; font-weight: bold">const</span> observable <span style="color: #333333">=</span> interval(<span style="color: #0000DD; font-weight: bold">100</span>).pipe(
        tap(n <span style="color: #333333">=&gt;</span> { }),
        map(n <span style="color: #333333">=&gt;</span> n <span style="color: #333333">*</span> <span style="color: #0000DD; font-weight: bold">10</span>)

      );

      <span style="color: #008800; font-weight: bold">const</span> initialTime <span style="color: #333333">=</span> <span style="color: #007020">Date</span>.now();


      <span style="color: #008800; font-weight: bold">const</span> subjectEvent <span style="color: #333333">=</span> createSubscription(
        observable,
        filter(n <span style="color: #333333">=&gt;</span> <span style="color: #007020">Math</span>.random() <span style="color: #333333">&gt;</span> <span style="color: #6600EE; font-weight: bold">0.7</span>),
        <span style="background-color: #fff0f0">&#39;divEvent&#39;</span>,
        initialTime);

      <span style="color: #008800; font-weight: bold">const</span> subjectSample <span style="color: #333333">=</span> createSubscription(
        subjectEvent,
        sampleTime(<span style="color: #0000DD; font-weight: bold">500</span>),
        <span style="background-color: #fff0f0">&#39;divSample&#39;</span>,
        initialTime);

      <span style="color: #008800; font-weight: bold">const</span> subjectAudit <span style="color: #333333">=</span> createSubscription(
        subjectEvent,
        auditTime(<span style="color: #0000DD; font-weight: bold">500</span>),
        <span style="background-color: #fff0f0">&#39;divAudit&#39;</span>,
        initialTime);

      <span style="color: #008800; font-weight: bold">const</span> subjectThr <span style="color: #333333">=</span> createSubscription(
        subjectEvent,
        throttleTime(<span style="color: #0000DD; font-weight: bold">500</span>),
        <span style="background-color: #fff0f0">&#39;divThr&#39;</span>,
        initialTime);


      <span style="color: #008800; font-weight: bold">const</span> subjectDelay <span style="color: #333333">=</span> createSubscription(
        subjectEvent,
        delay(<span style="color: #0000DD; font-weight: bold">500</span>),
        <span style="background-color: #fff0f0">&#39;divDelay&#39;</span>,
        initialTime);


      <span style="color: #008800; font-weight: bold">const</span> subjectBuffer <span style="color: #333333">=</span> createSubscription(
        subjectEvent,
        bufferTime(<span style="color: #0000DD; font-weight: bold">500</span>),
        <span style="background-color: #fff0f0">&#39;divBuffer&#39;</span>,
        initialTime);

      <span style="color: #008800; font-weight: bold">const</span> subjectDebounce <span style="color: #333333">=</span> createSubscription(
        subjectEvent,
        debounceTime(<span style="color: #0000DD; font-weight: bold">500</span>),
        <span style="background-color: #fff0f0">&#39;divDebounce&#39;</span>,
        initialTime);

    }
</pre></div>

`,
    method: () => {

      document.querySelector('#comparativaTimeAll').addEventListener('mouseover',(e)=>{
     //   e.target.querySelector('.hover').style.display = 'block';
      });

      const createDiv = (h, s, l, id, container) => {
        const div = document.createElement("div");
        div.id = id;
        div.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + l + "%)";
        document.querySelector("#" + container).append(div);
      };

      const printPosition = (initialTime, id, n) => {
        const now = Date.now();
        const position = Math.floor((now - initialTime) / 100) - 1;
        document.querySelector("#" + id + "" + position).style.backgroundColor =
          "hsl(" + n + ", 100%, 50%)";
      };

      const createSubscription = (subjectOrigin, operator, id, initialTime) => {
        const subj = new Subject();
        const subs = subjectOrigin.pipe(operator).subscribe(subj);
        const subs2 = subj.subscribe((n) => printPosition(initialTime, id, n));
        timer(10000).subscribe(() => {
          subs.unsubscribe();
          subs2.unsubscribe();
        });
        return subj;
      };

      for (let n = 0; n < 100; n++) {
        createDiv(n * 10, 100, 50, "divAll" + n, "comparativaTimeAll");
        createDiv(0, 0, 100, "divEvent" + n, "comparativaTimeEvent");
        createDiv(0, 0, 100, "divSample" + n, "comparativaTimeSample");
        createDiv(0, 0, 100, "divAudit" + n, "comparativaTimeAudit");
        createDiv(0, 0, 100, "divThr" + n, "comparativaTimeThr");
        createDiv(0, 0, 100, "divDelay" + n, "comparativaTimeDelay");
        createDiv(0, 0, 100, "divBuffer" + n, "comparativaTimeBuffer");
        createDiv(0, 0, 100, "divDebounce" + n, "comparativaTimeDebounce");
      }

      const spanExemple = document.querySelector("#comparativaTime");
      const observable = interval(100).pipe(
        tap((n) => {}),
        map((n) => n * 10)
      );

      const initialTime = Date.now();

      const subjectEvent = createSubscription(
        observable,
        filter((n) => Math.random() > 0.7),
        "divEvent",
        initialTime
      );

      const subjectSample = createSubscription(
        subjectEvent,
        sampleTime(500),
        "divSample",
        initialTime
      );

      const subjectAudit = createSubscription(
        subjectEvent,
        auditTime(500),
        "divAudit",
        initialTime
      );

      const subjectThr = createSubscription(
        subjectEvent,
        throttleTime(500),
        "divThr",
        initialTime
      );

      const subjectDelay = createSubscription(
        subjectEvent,
        delay(500),
        "divDelay",
        initialTime
      );

      const subjectBuffer = createSubscription(
        subjectEvent,
        bufferTime(500),
        "divBuffer",
        initialTime
      );

      const subjectDebounce = createSubscription(
        subjectEvent,
        debounceTime(500),
        "divDebounce",
        initialTime
      );
    },
  },

  {
    category: "operators",
    id: "comparativaE",
    name: "Comparativa entre els diferents operadors per esperar altres observables",
    description: `
    La segona línia són els esdeveniments que van arribant, filtrats aleatoriament.<br>
    La tercera mostra un sample si polsem sample.<br>
    La quarta és audit, aquesta espera un temps determinat per mostrar l'últim esdeveniment.<br>
    La quinta és Throttle, que espera un temps per mostrar el valor en el següent esdeveniment.<br>
    La sexta està buida <br>
    La septima és buffer, que espera un temps per llaçar un array dels esdeveniments que han arrivat.<br>
    L'última és debounce, que espera un temps sense esdeveniments per mostrar el següent.<br>
`,
    htmlExemple: ` 
    <div id="comparativaE">
    <button id="comparativaEButton">Pulsar</button>
    <button id="comparativaEButtonSample">Sample</button>
   
      <div id="comparativaAll"></div>
      <div id="comparativaEvent"></div>
      <div id="comparativaSample"></div>
      <div id="comparativaAudit"></div>
      <div id="comparativaThr"></div>
      <div id="comparativaDelay"></div>
      <div id="comparativaBuffer"></div>
      <div id="comparativaDebounce"></div>
      </div>
  
    `,
    htmlCode: `
   
`,
    method: () => {
      const createDiv = (h, s, l, id, container) => {
        const div = document.createElement("div");
        div.id = id;
        div.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + l + "%)";
        document.querySelector("#" + container).append(div);
      };

      const printPosition = (id, n) => {
        let pos = n;
        if (Array.isArray(n)) {
          for (let p of n) {
            document.querySelector("#" + id + "" + p).style.backgroundColor =
              "hsl(" + p * 10 + ", 100%, 50%)";
          }
        } else
          document.querySelector("#" + id + "" + pos).style.backgroundColor =
            "hsl(" + pos * 10 + ", 100%, 50%)";
      };

      const createSubscription = (subjectOrigin, operator, id) => {
        const subj = new Subject();
        const subs = subjectOrigin.pipe(operator).subscribe(subj);
        const subs2 = subj.subscribe((n) => printPosition(id, n));

        return subj;
      };

      for (let n = 0; n < 100; n++) {
        createDiv(n * 10, 100, 50, "divAll" + n, "comparativaAll");
        createDiv(0, 0, 100, "divEEvent" + n, "comparativaEvent");
        createDiv(0, 0, 100, "divESample" + n, "comparativaSample");
        createDiv(0, 0, 100, "divEAudit" + n, "comparativaAudit");
        createDiv(0, 0, 100, "divEThr" + n, "comparativaThr");
        createDiv(0, 0, 100, "divEDelay" + n, "comparativaDelay");
        createDiv(0, 0, 100, "divEBuffer" + n, "comparativaBuffer");
        createDiv(0, 0, 100, "divEDebounce" + n, "comparativaDebounce");
      }

      const spanExemple = document.querySelector("#comparativaTime");
      const observable = fromEvent(
        document.querySelector("#comparativaEButton"),
        "click"
      ).pipe(
        scan((acumulador, n) => acumulador + 1, 0)
        /*  tap((n) => {
          console.log(n);
        })*/
      );

      const subjectEvent = createSubscription(
        observable,
        filter((n) => Math.random() > 0.1),
        "divEEvent"
      );

      const subjectSample = createSubscription(
        subjectEvent,
        sample(
          fromEvent(
            document.querySelector("#comparativaEButtonSample"),
            "click"
          )
        ),
        "divESample"
      );

      const subjectAudit = createSubscription(
        subjectEvent,
        audit(() => interval(2000)),
        "divEAudit"
      );

      const subjectThr = createSubscription(
        subjectEvent,
        throttle(() => interval(2000)),
        "divEThr"
      );

      const subjectBuffer = createSubscription(
        subjectEvent,
        buffer(interval(2000)),
        "divEBuffer"
      );

      const subjectDebounce = createSubscription(
        subjectEvent,
        debounce(() => interval(2000)),
        "divEDebounce"
      );
    },
  },

  {
    category: "combinators",
    id: "zip",
    name: "zip () ",
    description: `Mescla en un array l'eixida de varis observables, espera a tindre valors nous de tots
   `,
    htmlExemple: ` 
    <div id="divZip">
    <button id="zipClik1">Click 1</button>
    <button id="zipClik2">Click 2</button>
    <span></span>
      </div>
    `,
    htmlCode: `
   
`,
    method: () => {
      const observableC1 = fromEvent(
        document.querySelector("#zipClik1"),
        "click"
      ).pipe(map((c) => 1));
      const observableC2 = fromEvent(
        document.querySelector("#zipClik2"),
        "click"
      ).pipe(map((c) => 2));

      zip(observableC1, observableC2).subscribe(
        (a) => (document.querySelector("#divZip span").innerHTML += a + " ")
      );
    },
  },

  {
    category: "combinators",
    id: "merge",
    name: "merge() ",
    description: `fa un observable de varis i els trau conforme van eixint.
   `,
    htmlExemple: ` 
    <div id="divMerge">
    <button id="mergeClik1">Click 1</button>
    <button id="mergeClik2">Click 2</button>
    <span></span>
      </div>
    `,
    htmlCode: `
   
`,
    method: () => {
      const observableC1 = fromEvent(
        document.querySelector("#mergeClik1"),
        "click"
      ).pipe(map((c) => 1));
      const observableC2 = fromEvent(
        document.querySelector("#mergeClik2"),
        "click"
      ).pipe(map((c) => 2));

      merge(observableC1, observableC2).subscribe(
        (a) => (document.querySelector("#divMerge span").innerHTML += a + " ")
      );
    },
  },

  {
    category: "combinators",
    id: "concat",
    name: "concat() ",
    description: `Espera a que un observable acabe abans de continuar en el següent.
   `,
    htmlExemple: ` 
    <div id="divConcat">
    <button id="concatClik1">Click 1</button>
    <button id="concatClik2">Click 2</button>
    <button id="endClik1">end 1</button>
    <span></span>
      </div>
    `,
    htmlCode: `
   
`,
    method: () => {
      const observableC1 = fromEvent(
        document.querySelector("#concatClik1"),
        "click"
      ).pipe(
        map((c) => 1),
        takeUntil(fromEvent(document.querySelector("#endClik1"), "click"))
      );
      const observableC2 = fromEvent(
        document.querySelector("#concatClik2"),
        "click"
      ).pipe(map((c) => 2));

      concat(observableC1, observableC2).subscribe(
        (a) => (document.querySelector("#divConcat span").innerHTML += a + " ")
      );
    },
  },

  {
    category: "combinators",
    id: "forkjoin",
    name: "forkJoin() ",
    description: `Espera a tots els observables i retorna un array en els últims valors. Es diferència de zip en que no guarda els valors anteriors i que espera a que acaben tots
   `,
    htmlExemple: ` 
    <div id="divfJ">
    <button id="fJClik1">Click 1</button>
    <button id="fJClik2">Click 2</button>
    <button id="endfJClik1">end 1</button>
    <span></span>
      </div>
    `,
    htmlCode: `
   
`,
    method: () => {
      const observableC1 = fromEvent(
        document.querySelector("#fJClik1"),
        "click"
      ).pipe(
        scan((c, n) => ++c, 0),
        takeUntil(fromEvent(document.querySelector("#endfJClik1"), "click"))
      );
      const observableC2 = fromEvent(
        document.querySelector("#fJClik2"),
        "click"
      ).pipe(
        scan((c, n) => ++c, 0),
        takeUntil(fromEvent(document.querySelector("#endfJClik1"), "click"))
      );

      forkJoin(observableC1, observableC2).subscribe(
        (a) => (document.querySelector("#divfJ span").innerHTML += a + " ")
      );
    },
  },

  {
    category: "combinators",
    id: "combineLatest",
    name: "combineLatest() ",
    description: `Retorna l'últim valor de cada observable. 
   `,
    htmlExemple: ` 
    <div id="divCL">
    <button id="combineLatestClik1">Click 1</button>
    <button id="combineLatestClik2">Click 2</button>
    <button id="endcombineLatestClik1">end 1</button>
    <span></span>
      </div>
    `,
    htmlCode: `
   
`,
    method: () => {
      const observableC1 = fromEvent(
        document.querySelector("#combineLatestClik1"),
        "click"
      ).pipe(
        scan((c, n) => ++c, 0),
        takeUntil(
          fromEvent(document.querySelector("#endcombineLatestClik1"), "click")
        )
      );
      const observableC2 = fromEvent(
        document.querySelector("#combineLatestClik2"),
        "click"
      ).pipe(
        scan((c, n) => ++c, 0),
        takeUntil(
          fromEvent(document.querySelector("#endcombineLatestClik1"), "click")
        )
      );

      combineLatest([observableC1, observableC2]).subscribe(
        (a) => (document.querySelector("#divCL span").innerHTML += a + " ")
      );
    },
  },

  {
    category: "combinators",
    id: "withLatestFrom",
    name: "withLatestFrom() ",
    description: `Com combineLatest, però és un poerador que s'executa en un pipe. 
   `,
    htmlExemple: ` 
    <div id="divWLF">
    <button id="withLatestFromClik1">Click 1</button>
    <button id="withLatestFromClik2">Click 2</button>
    <button id="endwithLatestFromClik1">end 1</button>
    <span></span>
      </div>
    `,
    htmlCode: `
   
`,
    method: () => {
      const observableC1 = fromEvent(
        document.querySelector("#withLatestFromClik1"),
        "click"
      ).pipe(
        scan((c, n) => ++c, 0),
        takeUntil(
          fromEvent(document.querySelector("#endwithLatestFromClik1"), "click")
        )
      );
      const observableC2 = fromEvent(
        document.querySelector("#withLatestFromClik2"),
        "click"
      ).pipe(
        scan((c, n) => ++c, 0),
        takeUntil(
          fromEvent(document.querySelector("#endwithLatestFromClik1"), "click")
        )
      );

      observableC1
        .pipe(withLatestFrom(observableC2))
        .subscribe(
          (a) => (document.querySelector("#divWLF span").innerHTML += a + " ")
        );
    },
  },

  {
    category: "HHO",
    id: "mergeAll",
    name: "mergeAll() ",
    description: `Transforma observables interns en externs. És a dir, mescla tots els observables que retorna un altre observable`,
    htmlExemple: ` 
    <div id="divMergeAll">
 
      </div>
    `,
    htmlCode: `
   
`,
    method: () => {
      function fakeFetch(n) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(n), Math.random() * 1000)
        );
      }
      from([1,2,3,4,5,6,7,8])
      .pipe(map(n=> from(fakeFetch(n))))
      .pipe(mergeAll())
      .subscribe(n => 
        document.querySelector('#divMergeAll').innerHTML += n+", "
        )
      const highOrderObservable = interval();
    },
  },



  {
    category: "HHO",
    id: "mergeMap",
    name: "mergeMap() ",
    description: `Mapeja en observables interns i transforma en externs`,
    htmlExemple: ` 
    <div id="divMergeMap">
 
      </div>
    `,
    htmlCode: `
   
`,
    method: () => {
      function fakeFetch(n) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(n), Math.random() * 1000)
        );
      }
      of([1,2,3,4,5,6,7,8])
      .pipe(
        mergeMap(n=> from(n)),
        mergeMap(n=> fakeFetch(n))
      )
      .subscribe(n => document.querySelector('#divMergeMap').innerHTML += n+", ")
 
    },
  },




  {
    category: "HHO",
    id: "switchMap",
    name: "switchMap() ",
    description: `Com mergeMap però cancelant l'intern si arriven nous externs`,
    htmlExemple: ` 
    <div id="divswitchMap">
 
      </div>
    `,
    htmlCode: `
   
`,
    method: () => {
      function fakeFetch(n) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(n), Math.random() * 1000)
        );
      }
      interval(500)
      .pipe(take(10), switchMap(n=> from(fakeFetch(n))))
      .subscribe(n => document.querySelector('#divswitchMap').innerHTML += n+", ")
    
    },
  },



  {
    category: "HHO",
    id: "concatMap",
    name: "concatMap() ",
    description: `Com mergeMap però ordenat`,
    htmlExemple: ` 
    <div id="divconcatMap">
 
      </div>
    `,
    htmlCode: `
   
`,
    method: () => {
      function fakeFetch(n) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(n), Math.random() * 1000)
        );
      }
      from([1,2,3,4,5,6,7,8])
      .pipe( concatMap(n=> from(fakeFetch(n))))
      .subscribe(n => document.querySelector('#divconcatMap').innerHTML += n+", ")
   
    },
  },
];
