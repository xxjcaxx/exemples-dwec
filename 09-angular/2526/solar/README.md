# Projecte de plaques solars

## Objectius inicials
* La base de dades serà Supabase
    * Utilitzarem SDK de supabase per autenticar, dades, imatges i websockets
    * RLS per als permisos dels clients
* Es guarden les plantes solars amb ubicació i foto de forma que l'instal·lador les puga donar d'alta amb el mòvil. La ubicació es trau de l'API del navegador.
* Cada planta solar emet uns registres cada cert temps que es guarden a la base de dades. Aquests registres són de consum i generació elèctrica.
* Cal fer un usuari administrador que ho pot gestionar tot. (CRUD) 
* Els usuaris clients poden veure les seues plantes i registres de les mateixes.
* Cada planta tindrà una vista de detall amb la foto, les dades i una gràfica en temps real amb websockets i alguna llibreria de gráfiques.
* Formularis:
    * Formulari de plantilla per al buscador reactiu de plantes solars
    * Formulari reactiu per al registre, login i perfil d'usuari
    * Signal Form per a donar d'altra i editar plantes solars. 
    * Tots els formularis tenen validació i es farà una validació personalitzada al menys.
* Reactivitat:
    * Els servicis utilitzaran Observables i Subjects amb pipe, també els web sockets
    * Els components i formularis utilitzaran majoritariament Signals
* Components:
    * Els components obtindran les dades per input() ja siga de components pares o de les rutes
    * Els components fills que tinguen interaccions es comuniquen amb els pares amb output()
    * Els components principals són els que es relacionen amb els servicis principalment amb Observables

## Ampliacions
* Opcionalment es veurà un mapa amb totes les plantes de tots els clients o per client.
* Es mantindrà l'estat de l'aplicació amb Redux.
* S'utilitzaran components d'Angular Material. 