# Tests en Mocha

La combinació de Mocha+Chai per a fer tests en JS és una de les més utilitzades. Es pot utilitzar tant per a Nodejs com per a JS en el navegador web. Hi ha diferències molt importants en quant als recursos que proporcionen els dos entorns i a la manera de gestionar els mòduls.

En Nodejs no tens accés al DOM i tradicionalment ha utilitzar CommonJS com a mètode per a fer mòduls. No obstant, actualment ja suporta mòduls ES6. Com que el que ens interessa és fer tests en la part del client i utilitzar sintaxi moderna de Javascript, tenim que adaptar els nostres test i l'entorn.

Aquests exemples no són de cóm fer tests, estan centrats en preparar l'entorn per a fer tests còmodament. Hi ha una funció que va a ser avaluada i un test, però no és molt important. Per saber cóm se fan tests en Mocha hi ha molts recursos per Internet.

En el cas del desenvolupament web en la part de client, tenim moltes opcions de configuració. En aquest manual amb exemples, anem a veure algunes de les opcions. En totes utilitzem mòduls ES6 o de Webpack, en totes s'instal·len les ferramentes amb npm. És possible utilitzar Mocha i Chai descarregant els fitxers o amb un CDN. Alguns exemples, sobretot els de navegador no necessitaran molts canvis per a que funcionen d'aquesta manera.

## Tests en Mocha+Chai en el navegador

La primera i més fàcil és executar mocha.js en el navegador directament. Cal afegir els .js i .css corresponents i els tests. Les ferramentes s'instal·len en npm:

```bash
npm install --save-dev mocha chai
```

Incorporem els fitxers accedint directament a la ruta en el fitxer HTML:

```html
<link rel="stylesheet" href="./node_modules/mocha/mocha.css">
<script src="./node_modules/mocha/mocha.js"></script>
<script src="./node_modules/chai/chai.js"></script>
...
<div id="mocha"></div>
<script class="mocha-init">mocha.setup('bdd'); mocha.checkLeaks();</script>
<script type="module" src="scripts.js"></script>
<script type="module" src="test.js"></script>
<script class="mocha-exec">mocha.run(); </script>
```

Aquest exemple el tenim en el directori de fibonnaci.

El problema és que utilitzem rutes a node_modules, que incorporem part del JS al HTML i que no estem utilitzant cap empaquetador. 

## Tests En CLI

També podem executar els tests per la terminal directament en cas de que no tinguen cap referència a "document", per exemple, ja que per la terminal s'executa amb nodejs i aquest no té un navegador. En cas de necessitar accedir al DOM, podem instal·lar jsdom:

```bash
npm install --save-dev --save-exact jsdom jsdom-global
```

I executar mocha amb:

```bash
mocha -r jsdom-global/register
```

Als fitxers de tests cal importar chai:

```javascript
import chai from 'chai';
```

No hi ha gran diferència. No obstant, d'aquesta manera no cal fer un HTML amb mocha. El resultat no és molt vistós i no es pot compartir en la web en resultat dels tests (imaginem que estem treballant en equip i volem accedir tots en directe als tests)

## Tests en Mocha+Chai+Webpack en el navegador

ATENCIÓ: En 2022 han fet un error en mocha-es2018 i deixa de funcionar en navegadors. L'única alternativa és utilitzar el del CDN. 

Webpack empaqueta fitxers de Javascript i crea un bundle. El bundle, una vegada fet, és difícil d'accedir. Per això, cal fer tests abans o incorporar els tests al bundle.

```bash
npm install webpack webpack-cli --save-dev
npm install --save-dev html-webpack-plugin
npm install --save-dev style-loader css-loader
```

En aquest cas, els incorporem amb:

```javascript
import 'mocha/mocha.css';
import mocha from "mocha/mocha-es2018";
import chai from 'chai';
```

Tenim que importar mocha-es2018 perquè és el que webpack pot empaquetar, ja que té sintaxi de mòduls com ES6. 

L'exemple el teniu en fibonacciWP.

En cas de no voler fer tests, sols cal llevar la línia de importació del fitxer de tests.

Aquesta és una de les millors opcions. Permet monitoritzar en remot els tests, es fan després de ser empaquetats i és relativament fàcil de llevar. La solució proposada és molt simple. En cas de complicar la quantitat de bundles, fitxers html i demés, el fitxer de configuració de webpack es complica.

## Tests en Mocha+Chai+Webpack en CLI

Per a que funcione, necessitem el paquet instant-mocha (https://github.com/privatenumber/instant-mocha), que és una versió més moderna de mocha-webpack. 

```bash
npm install --save-dev instant-mocha --legacy-peer-deps
```

Cal ficar l'opció de ---legacy-peer-deps per un conflicte de versions, no obstant, funciona.

Els tests el ficarem en un fitxer anomenat test.js i en ell importarem tant chai com els mòduls que estem fent en .src.

Per executar:

```bash
instant-mocha ---webpack-config webpack.config.js
```

En cas de tindre DOM:

```bash
npx instant-mocha --webpack-config webpack.config.js -r jsdom-global/register './src/test.js' 
```

Com es veu, afegim el jsdom per a simular un navegador. Els tests no s'afegeixen al bundle si no volem, per tant, no cal fer res per a passar a producció.

L'exemple està en el directori de fibonacciWPCLI.

