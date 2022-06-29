import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, mergeMap, of } from 'rxjs';
import { Survivor } from '../interfaces/survivor';

@Injectable({
  providedIn: 'root'
})
export class SurvivorsService {

  url = "https://dwec-daw-default-rtdb.firebaseio.com/negocity/survivors";

  private httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient) { }

  public getSurvivors(): Observable<Survivor[]> {
    if (localStorage.getItem('idToken')) {
      const localId = localStorage.getItem('localId');
      //this.httpOptions.headers = this.httpOptions.headers.set('Authorization', localStorage.getItem('idToken')!)

      return this.http.get<{ [key: string]: Survivor }>(this.url + `.json?orderBy="player"&equalTo="${localId}"`, this.httpOptions)
        .pipe(
          map(sObjecte => Object.entries(sObjecte)),
          map(sArray => sArray.map(s => {
            s[1].id = s[0];
            s[1].name = s[1].name ? s[1].name : 'name';
            s[1].health = s[1].health ? s[1].health : 0;
            s[1].damage = s[1].damage ? s[1].damage : 0;
            s[1].shield = s[1].shield ? s[1].shield : 0;
            return s[1] })));
    }
    else {
      return of([]);
    }
  }

  /*
  servidor ->  {'s1': {name: 'sup1'}, 's2': {name: 'sup2'}}
  entries() ->  [['s1',{name: 'sup1'}],['s2',{name: 'sup2'}]]
  return   ->  [{id:'s1', name: 'sup1' },{}]
  */

  public getSurvivor(id: string): Observable<Survivor | null> {
    if (localStorage.getItem('idToken')) {

    return this.http.get<Survivor>(`${this.url}/${id}.json`)
      .pipe(map(s => {
        s.id = id;
        s.name = s.name ? s.name : 'name';
        s.health = s.health ? s.health : 0;
        s.damage = s.damage ? s.damage : 0;
        s.shield = s.shield ? s.shield : 0;
        return s }));
    }
    else {
      return of(null);
    }
  }

  public createRandomSurvivor(): Observable<Survivor[]> {
    if (localStorage.getItem('idToken')) {


    let newSurvivor = {
      name: this.generateName(),
      image: `./assets/img/survivor${Math.round(Math.random() * 50)}.jpg`,
      health: 50, damage: 50,shield: 50,
      city: '',
      player: localStorage.getItem('localId')
    }
    //console.log(newSurvivor);

    return this.http.post<Survivor>(this.url + `.json` , JSON.stringify(newSurvivor))
      .pipe(mergeMap(() => this.getSurvivors()))

    // mergeMap espera al primer valor de l'Observable del POST per inicial el Observable que retorna getSurvivors
    // El pipe retorna un Observable
  }
  else {
    return of([]);
  }

  }

  public updateSurvivor(survivor: Survivor): Observable<Survivor>{
    let auxSurvivor: any = {...survivor};
    delete auxSurvivor.id;
    return this.http.put<Survivor>(`${this.url}/${survivor.id}.json`,JSON.stringify(auxSurvivor))
    .pipe(map(s=> {s.id = survivor.id; return s}))
  }

  public deleteSurvivor(id: string): Observable<Survivor[]> {
    return this.http.delete<Survivor>(`${this.url}/${id}.json`)
      .pipe(mergeMap(() => this.getSurvivors()))
  }

  private generateName(): string {

    let first = ["Commander", "Bullet", "Imperator", "Doof", "Duff", "Immortal", "Big", "Grease", "Junk", "Rusty", "Gas", "War",
      "Feral", "Blood", "Lead", "Max", "Sprog", "Allan", "Smoke", "Wagon", "Baron", "Leather", "Rotten",
      "Salt", "Slake", "Sick", "Sickly", "Nuke", "Oil", "Night", "Water", "Tank", "Rig", "People", "Nocturne",
      "Satanic", "Dead", "Wandering", "Suffering", "Unfit", "Deadly", "Mike", "Nomad", "Mad", "Jhonny", "Unpredictable",
      "Freakish", "Snake", "Praying", "Banson", "Kieran-Scott", "Crelen", "Smithett", "Cursor", "Gabeth", "Vaney", "Diarmuid",
      "Brodie", "Warl", "Kell", "Hzee", "Dylin", "Crandra", "Kaelan", "Koushik", "Purpleaticus", "Paul", "Spoey", "Tizzy", "Krulan",
      "Spaden", "Waban", "Kolotov", "Stecca", "Mamantha", "Mueez", "Mabeth", "Marworth", "Purton", "Feden", "Henderson", "Butallister",
      "Matthias", "Jenkins", "Logan", "Leylann", "Warworth", "Hahn", "Mecca", "Joyner", "Cpounder", "Killian", "Decker", "Walkton", "Charlesworth",
      "Stalister", "Lightcoller", "Trabeth", "Chan", "Goodwin", "Nates", "Trelen", "McKay", "Cick", "Dreamfadden", "Comm", "Krurton", "Hendricks", "Eduards",
      "Olson", "Kelallister", "Poole", "Foss", "Skycaster", "Mashhood", "Marcello", "Trecca", "Seaan", "Hyde", "Warscraper", "Quaden", "Brewer",
      "Kalvyn", "Bloodilsworth", "Jayden", "Delgado", "Townsend", "Polotov", "Faisal", "Irave", "Scanwalker", "Spectrumave", "Mael", "Joan", "Burks",
      "Preston", "Stake", "Bloodskater", "Deryn", "Todd", "Bret", "Yick", "Solich", "Mikey", "Keane", "Wromm", "Ridwan", "Brerry", "Akram", "Ghostave",
      "Kenzo", "Gregory", "Zalister", "Hilly", "Scotty", "Bakerton", "Munmair", "Mscooter", "Hetmer", "Rowe", "Camerin", "Geordan", "Rzee", "Gonzales",
      "Zanson", "Tamantha", "Martin", "Fiki", "Brehme", "Kristian", "Rufus", "Molina", "Gothley", "Wrurton", "Allan-Laiton", "Corran", "Donovan", "Lonic",
      "Marzuq", "Ireoluwa", "Daumantas", "Oisin", "Blackseeker", "Jostov", "Trohn", "Peregrine", "Pearse", "Drew", "Trolotov", "Dharam", "Puckett", "Pandra",
      "David", "Necca", "Nathan", "Washington", "Slater", "Baillie", "Singleton", "Mitchell", "LL.D", "Arran", "Wiki", "Macisomb", "Celen", "Maneet", "Romm",
      "Traden", "Malister", "Kelton", "Chidera", "Paolo", "Promm", "Spectrumaite", "Laserwalker", "Laserorn", "Habeth", "Burak", "Dylan-Patrick", "Lennex",
      "Kain", "Crohn", "Cleveland", "Kamantha", "Chaitanya", "Burler", "Quizzy", "Hames", "Kalen", "Odom", "Sheppard", "Cton", "Mohammad-Bilal", "Dyllan-James",
      "Owens", "Purplecoiler", "Simon", "Bowie", "Rates", "Macaulay", "Afonso", "Nabeth", "Laseradder", "Quik", "Lincoln-John", "Irler", "Butwin", "Hunter",
      "Pruben", "Vake", "Highley", "Rogawa", "Sandburton", "Embsock", "Curton", "Burch", "Baron", "Conlly", "Christopher-Lee", "Neal", "Burson", "Orson",
      "Honic", "Yilly", "Mccray", "Wolfe", "Abdallah", "Dean", "Lochlan-Oliver", "Stabeth", "Zecca", "Spokeartell", "Charlie", "Purplesaberer", "Niki",
      "Pawlo", "Cavan", "Wurton", "Bony", "Paban", "Bradford", "Felen", "Folarinwa", "Prark", "Howe", "Steele", "Shaunpaul", "Ctus", "Mayson", "Tonic",
      "Jadilliumson", "Wrilly", "Abid", "Hedex", "Kelsailer", "Scott-Alexander", "Sherman", "Alanas", "Brizzy", "Pele", "Gavin-Lee", "Bloodsonian",
      "Price", "Comwalker", "Rilliumson", "Dale", "Donnie", "Emberworth", "Jaden", "Phoenix", "Chang", "Feyoun", "Nark", "Tronic", "Pronic",
      "Macaully", "Robbins", "Jadick", "Vflyer", "Oneill", "Sharpe", "George", "Randolph", "Reilly", "Spilly", "Jensen", "Reynold", "Macauley",
      "Minister", "Pugh", "Wohn", "Tostov", "Pross", "Jennings", "Shaarvin", "Ryhs", "Khizer", "Ciarian", "Cantu", "Kash", "Whiteilsworth",
      "Wise", "Spurton", "Clifford", "Jaydn", "Donnacha", "Perry", "Adenn", "Davspeeder", "Chase", "Beckerwalker", "Jayden-Thomas", "Nonic", "Sandro", "Trandra",
      "Kylian", "Humphrey", "Parks", "Willy", "Comler", "Barlow", "Mseeker", "Gamble", "Yandra", "Bryden", "Deleon", "Jerome", "Fergus", "Wrozhenko", "Nacker",
      "Ortiz", "Greyenter", "Warsaberer", "Srohn", "Fick", "Keith", "Skywin", "Rojas", "Spark", "Toss", "Bakerorn", "Holotov", "Trall", "Center", "Mountartell",
      "Lawrie", "Hayden", "Hari", "Fozhenko", "Whiteton", "Ponic", "Doss", "Watson", "Guerra", "Vuben", "Kelso", "Maxwell", "Gutierrez", "Ghostox", "Colt", "Aguirre",
      "Fisher", "Gardner", "Brooklin", "Presley", "Gomez", "Yarol", "Campbel", "Frost", "Ralph", "Phasersaberer", "Ryden", "Rolotov", "Dzee", "Krell", "Rick",
      "Landry", "Griffith", "Quzee", "Daryn", "Haseeb", "Mathias", "Johnathan", "Burnett", "Corie", "Niall", "Gelen", "Sykes", "Dark", "Yellis", "Cameron", "Dennin",
      "Macworm", "Stark", "Mcoller", "Irvin", "Benjamin", "Christensen", "Dudley", "Woolisomb", "Sweet", "Rowen", "Dilan", "Aldred", "Ihtisham", "Morris", "Brooks",
      "Raja", "Massey", "Aryankhan", "Zizzy", "Thunderer", "Craig-James", "Bruin", "High", "Kaine", "Alastair", "Johann", "Vonian", "Keison", "Goff", "Flynn", "Skyox",
      "Castro", "Eroni", "Criker", "Karsyn", "Cohan", "Devrin", "Crulan"];
    let second = ["Killer", "Rider", "Cutter", "Guts", "Eater", "Warrior", "Colossus", "Blaster", "Gunner", "Smith",
      "Doe", "Farmer", "Rock", "Claw", "Boy", "Girl", "Driver", "Ace", "Quick", "Blitzer", "Fury", "Roadster",
      "Interceptor", "Bastich", "Dweller", "Thief", "Bleeder", "Face", "Mutant", "Anomaly", "Risk",
      "Garcia", "Salamanca", "Goodman", "Sakura", "Bleding Gums", "Absent", "Hybrid", "Desire", "Bubblegum"
      , "Serpente", "Petal", "Dust", "Mantis", "Preacher", "Harkonnen", "Heisenberg", "Vonn Newman", "Macpounder", "Vice", "Whitaker", "Benedict", "Owen", "Buttus",
      "Bharath", "Hizzy", "Sronic", "Embfadden", "Richardson", "Beyoun", "Kellen", "Yilliumson", "Cherry", "Krandra", "Callahan", "Fowler", "Cummings", "Bradly",
      "Bauer", "Curry", "Mylo", "Brandyn", "Oneal", "Jeevan", "Zamantha", "SCPO", "Yiki", "Admiral", "Zuben", "Dilly", "Gilly", "Beach", "Sraden", "Gillespie",
      "Wronic", "Blackatus", "Helen", "Orran", "Mcintyre", "Highsmith", "Momooreoluwa", "Ieuan", "Diki", "Darragh", "Myers", "Togawa", "Officer", "James", "Chris-Daniel",
      "Comsonian", "Espinoza", "Mills", "Davtell", "Samarjit", "Rorie", "Kiyonari", "Mckee", "Petty", "Pavit", "Darryl", "Ziker", "Boyle", "Hake", "Guerrero", "Robinson",
      "Landpounder", "Quacker", "Makin", "Williams", "Gregor", "Ph.D", "Ivan", "Brik", "Tabeth", "Gray", "Dion", "Srark", "Owais", "Herman", "Wake", "Specca", "Franco",
      "Hiburton", "Smith", "Rosario", "Noan", "Dohn", "Hashem", "Zames", "Velen", "Macsock", "Holden", "Kroey", "Rios", "Livingston", "Ferry", "Zilly", "Cogawa", "Blackwell",
      "Jadilly", "Fiachra", "Talister", "Thunderscooter", "Carl", "Zohn", "Kelwalker", "Bandra", "Quon", "Ghostson", "Azeem", "Bryant", "Jerry", "Burer", "Emblaserer", "Albie",
      "Vpounder", "Brurton", "Prursor", "Coey", "Tretmer", "Grady", "Bullock", "Srarol", "Joshiah", "Rames", "Davsailer", "Davorn", "Caine", "Kodi", "Daymian", "Maddox", "Major",
      "Trevino", "Richard", "Emile", "Mccarthy", "Croey", "Bakersock", "Cralister", "Trurton", "Ellis", "Kelum", "Ailin", "Samy", "Peterson", "Esteban", "Bentley", "Green", "Darn",
      "Crzia", "Iain", "Mounter", "Gentry", "Rhys-Bernard", "Rudi", "Mtus", "Hecca", "Kaydyn", "Russo", "Connar", "Habeeb", "Devlin", "Lohn", "Wrake", "Bodhan", "Morrison", "Cooper",
      "Monic", "Cake", "Durton", "Greypounder", "Sturton", "Maksim", "Shelton", "Kalister", "Professor", "Deklain-Jaimes", "Ayren", "Lowery", "Trake", "Gordon", "Kavid", "Blackworm",
      "Hodges", "Landich", "Higher", "Kori", "Carrich", "Hurton", "Brad", "Vaban", "Kashif", "Barrett", "Kulan", "Workman", "Commodore", "Prostov", "Dyler", "Embatus", "Konrad", "Daryl",
      "Woolet", "Eoghan", "Tyler", "Graves", "Maney", "Jadomm", "Bradley", "Essa", "Bloodtell", "Madison-Jake", "Burworth", "Kirby", "Waters", "Quuben", "Riley", "Wrabeth", "Warworm",
      "Cain", "Briaddon", "Cmdr", "Christian", "Yomm", "Shayne", "Patterson", "Mayer", "Roth", "Burspeeder", "Captain", "Holcomb", "Drake", "Jonah", "Kaydn", "Goey", "Nake", "Srarl",
      "Lightcoiler", "Darach", "Fulton", "Asif", "Farl", "Sredex", "Believe", "Nickhill", "Saunders", "Hardin", "Hooper", "Fideman", "Abaan", "Carver", "Rear", "Jubin", "Sralister",
      "Wall", "Rellis", "Sellers", "Truben", "Vohn", "Gzia", "Lenon", "Arandeep", "Manolo", "Vizzy", "Sandox", "Rosa", "Dawson", "Prarl", "Ashley", "Filly", "Qasim", "Deon", "Aaryan",
      "Cavid", "Ruaraidh", "Nikash", "Nick", "Stizzy", "Laurie", "Ensign", "Nomm", "Pratt", "Eaton", "Macscooter", "Otto", "Sames", "Jaise", "Hopkins", "Miles", "Bumtus", "Landatus",
      "Caolan", "Hood", "Carson", "Meyoun", "Stevenson", "Rich", "Furton", "Krohn", "Wroey", "Lloyd", "Sonic", "Trames", "Werry", "Dodsailer", "Cuben", "Spoketon", "Mfadden", "Vamantha",
      "Kelvan", "Bell", "Frederick", "Ghostilsworth", "Kenyon", "Larsen", "Sraban", "Kasey", "O'er", "Quogawa", "Calin", "Kronic", "Perez", "Nalister", "Burris", "Stein", "Landadder",
      "Wranson", "Jaime", "Landley", "Marks", "Etienne", "Harjyot", "Gallegos", "Misomb", "Marsailer", "Jaay", "Briki", "Buck", "Rajan", "Rihards", "Sideman", "Kacker", "Jeyun", "Carrick",
      "Sandworth", "Harish", "Ingram", "Guben", "Johnston", "Spavid", "Wetmer", "Sawyer", "Vacker", "Marich", "Ruben", "Shaw", "Lara", "Embertus", "Croan", "Ronnie", "Jick", "Kabir",
      "Haydyn", "Nyler", "Deano", "Kelvin", "Nelson", "Karol", "Lomm", "Ryan", "Indy", "Kevin", "Stephens", "Wcher", "Ashtyn", "Fizzy", "Noel", "Callister", "Terry", "Bizzy", "Rori",
      "Domm", "Kevyn", "Curtis", "Walkatus", "Rehan", "Rosales", "Spokelaserer", "Barath", "Wrursor", "Macfadden", "Kemp", "Yurton", "Haley", "Macias", "Vtus", "Davcoller", "Prex", "Watts"];

    return first[Math.floor(Math.random() * first.length)] + " " + second[Math.floor(Math.random() * second.length)];
  }


}


