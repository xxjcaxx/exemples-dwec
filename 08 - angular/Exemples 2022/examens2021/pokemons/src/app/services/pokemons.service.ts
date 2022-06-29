import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Pokemons } from '../interfaces/pokemons';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(
    private h: HttpClient
  ) { }

  tipus = new BehaviorSubject<string[]>([]);


  getPokemons():Observable<Pokemons[]>{
   return this.h.get<Pokemons[]>('http://localhost:4200/assets/pokemons.json').pipe(
     map(p=> {
      this.tipus.next([...new Set(p.map(P => P.type).flat())])
      return p.map(P=> {
       P.totalPower =  Number(P.base.Attack) + Number(P.base.Defense) + Number(P.base.HP) + Number(P.base.Speed);
       return P;
     })}
     )
   );
  }
}
