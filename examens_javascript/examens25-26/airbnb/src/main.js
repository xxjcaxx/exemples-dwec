/*

Si arranques el projecte amb npm run dev s'executa tant json-server com Vite, i pots accedir a l'aplicació a http://localhost:5173 i a la API a http://localhost:3000.

La API de josn-server permet moltes operacions, però sols ens interessen les següents:

- GET /apartments: per obtenir totes les propietats
- GET /apartments/:id: per obtenir una propietat concreta
- GET /apartments?_page=1&_per_page=10&state:eq=Chon Buri Province': per obtenir les propietats de la pàgina 1, amb 10 resultats per pàgina, i que estiguin a la província de Chon Buri. (cal evitar els espais en els paràmetres, per això s'ha d'usar %20 amb les funcions que javascript proporciona per a construir les URLs).
- GET /apartments?_page=1&_per_page=10&state:contains=Chon : per obtenir les propietats de la pàgina 1, amb 10 resultats per pàgina, i que continguen la paraula Chon (això inclourà les propietats de Chon Buri, però també les de Chon Daen, per exemple).


Cal fer una aplicació web que mostre les propietats disponibles a la API. Mostrarà sols 10, però permetrà navegar entre les diferents pàgines de resultats. També permetrà buscar per província tant amb una coincidència exacta com amb una coincidència parcial. 

1 (1)Crea un component ApartmentCard que mostre la informació d'una propietat (foto, descripció, preu, etc.). Aquest component rebrà les dades de la propietat amb una funció setter.

2 (3)Crea un component ApartmentList que mostre una llista de propietats. Aquest component farà les peticions a la API per obtenir les propietats i passarà les dades a ApartmentCard per a mostrar-les. També inclourà els controls per a navegar entre les pàgines de resultats. El component tindrà el seu propi CSS sense afectar altres components amb shadow DOM.

3 (3) Crea un servici que exporte un behavior subject que continga l'estat de la pàgina actual i el terme de cerca. Aquest servici serà utilitzat per ApartmentList per a gestionar l'estat de l'aplicació i realitzar les peticions a la API en funció d'aquest estat.

4 (1) Crea un component App que integre ApartmentList i mostre l'aplicació completa.

5 (2) Crear un component SearchBar que permeta realitzar cerques per província. Aquest component sols emetrà la paraula de cerca amb un esdeveniment personalitzat, i serà ApartmentList qui realitzarà la petició a la API en funció d'aquesta paraula de cerca.

*/

import "./components/apatmentCard.js"
import "./components/apartmentList.js"
