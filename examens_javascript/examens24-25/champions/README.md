# Exàmen 1er Trimestre 
## DAW, DWEC, Curs 24-25


La nostra tasca és crear una web per mostrar dades dels equips de futbol que juguen la Champions d'enguany. 

Ja s'ha creat una base de dades en Supabase amb les dades actuals i l'arxiu `supaservice.js` conté l'apiKey i les urls mínimes per a funcionar. Les regles RLS són molt permissives i es pot consultar i modificar en totes les taules. 

Com en molts casos reals, algún ja ha dissenyat cóm va a quedar la web i es pot veure en l'`index.html` les etiquetes que s'utilitzaran i cóm pot quedar la web amb dades estátiques. 

Ja hi ha moltes coses fetes, per tant, sols cal acabar les funcions que tenen comentaris i que fallen als tests. Amés, cal completar alguns Web Components.

Els arxius que tenen feina per a l'examen són:

* index.html : Es por esborrar les dades estàtiques que ja no es necessiten. 
* main.js : Descomentar i no fer res més.
* (1 punt) supaservice.js : Completar la funció `fetchTable` tal com diu l'enunciat. 
* (3 punts) dom.js : `appendDivs`, `createCustomElement`, `createDivs` són funcions que no estan acabades, els tests vos ajudaran a fer-les. 
* (2 punts) functionals.js : `sumStats`, `extractDataToArray` tampoc estan fetes. Han de passar els tests i funcionar correctament a la web. 
* (1 punt) playersComponent.js: Completar l'innerHTML segons la plantilla dissenyada. 
* (3 punts) playersComponent.js: Afegir a cada player una col·lecció de botons per incrementar en 1 els gols de cada tipus i el total de gols. Aquesta modificació es guardarà a la base de dades. Tota aquesta funcionalitat s'ha implementar de 0: 
    * Un Web Component amb els botons que emet un event quan es clica. 
    * Una funció en supaservice.js que actualitza els gols segons el botó que s'ha clicat en el jugador que toque. 
    * Refrescar tota la vista de l'equip per refrescar la gràfica. 

Si fallen els tests encara que funcione una funció es considerarà que la funció està feta al 50%.
Que la web funcione sense errors, encara que li falten funcionalitats es valorarà positivament. 
