import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, Observable } from 'rxjs';
import { IHeroe } from './i-heroe';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  constructor(private http: HttpClient) { }

  heroesSubject = new BehaviorSubject<IHeroe[]>([])

  url = `https://dwec-daw-default-rtdb.firebaseio.com/heroes`;

  getHeroes():Observable<IHeroe[]>{
    this.http.get<{[key: string]: IHeroe}>(this.url+'.json')
    .pipe(
      map( sObjecte => Object.entries(sObjecte)),
      map( sArray => sArray.map(s=> { s[1].id = s[0]; return s[1]})) )
    .subscribe(h => this.heroesSubject.next(h))

     return this.heroesSubject;
  }

  createHero(h:IHeroe){
    this.http.put<IHeroe>(`${this.url}/${h.id}.json`, JSON.stringify(h))
    .pipe(mergeMap(() => this.getHeroes())).subscribe(()=>{});
  }

}
