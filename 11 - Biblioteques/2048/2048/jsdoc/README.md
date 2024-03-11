<a name="module_2048"></a>

## 2048
Aquesta biblioteca proporciona varies funcions per jugar al 2048
Tan sols implementa la generació del tauler i el càlcul dels moviments
No fa res relacionat amb l'interfície gràfica ni el càlcul de punts.

En realitat, sols tens que utilitzar la funció

**See**: moveBoard  

* [2048](#module_2048)
    * [.generate2048Board(size)](#module_2048.generate2048Board) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
    * [.randomPlace(board)](#module_2048.randomPlace) ⇒ <code>function</code>
    * [.moveRow(array)](#module_2048.moveRow) ⇒ <code>Array.&lt;number&gt;</code>
    * [.rotateMatrix(matrix, n_rotations)](#module_2048.rotateMatrix) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
    * [.moveBoard(board)](#module_2048.moveBoard) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>

<a name="module_2048.generate2048Board"></a>

### 2048.generate2048Board(size) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
Aquesta funció genera un tauler aleatori amb 2 2

**Kind**: static method of [<code>2048</code>](#module_2048)  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | Mida del tauler |

<a name="module_2048.randomPlace"></a>

### 2048.randomPlace(board) ⇒ <code>function</code>
Aquesta funció rep un tauler buit i retorna una funció que accepta un número per a posar-ho 2 vegades en el tauler

**Kind**: static method of [<code>2048</code>](#module_2048)  

| Param | Type |
| --- | --- |
| board | <code>Array.&lt;number&gt;</code> | 

<a name="module_2048.moveRow"></a>

### 2048.moveRow(array) ⇒ <code>Array.&lt;number&gt;</code>
Aquesta funció mou un array unidimensional cap al final, si troba dos números iguals els suma i els coloca cap al final La funció sols fa un moviment i retorna el resultat d'aquest moviment. Si el moviment no suposa cap canvi, retorna sols una còpia de l'array original Sempre retorna una copia, no muta l'array original

**Kind**: static method of [<code>2048</code>](#module_2048)  

| Param | Type |
| --- | --- |
| array | <code>Array.&lt;number&gt;</code> | 

<a name="module_2048.rotateMatrix"></a>

### 2048.rotateMatrix(matrix, n_rotations) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
Aquesta funció rota una matriu n vegades en el sentit de les agulles del rellotge

**Kind**: static method of [<code>2048</code>](#module_2048)  

| Param | Type |
| --- | --- |
| matrix | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | 
| n_rotations | <code>number</code> | 

<a name="module_2048.moveBoard"></a>

### 2048.moveBoard(board) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
Aquesta funció rep un tauler i retorna una funció per moure en alguna de les 4 direccions possibles El moviment desplaça tots els números cap a un costat, sempre que ocupen posicions amb 0. En cas de trobar 2 números iguals i en el mateix eix del moviment, retorna la suma. i la col·loca sobre el número més pròxim al destí del moviment

**Kind**: static method of [<code>2048</code>](#module_2048)  

| Param | Type |
| --- | --- |
| board | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | 

