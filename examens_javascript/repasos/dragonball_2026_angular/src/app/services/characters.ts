import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root',
})
export class Characters {
  http: HttpClient = inject(HttpClient);

  charactersCache = new BehaviorSubject<Character[]>([])
  charactersFiltered = new BehaviorSubject<Character[]>([])

  getCharacters() {
    this.http.get<Character[]>(`http://localhost:3000/items`)
      .pipe(
        map(response => response),
        //tap(response => this.charactersCache.next(response))
      ).subscribe(r => {
        this.charactersCache.next(r);
        this.charactersFiltered.next(r);
      })
  }

  searchCharacters(searchString: string) {
    const currentCharacters = this.charactersCache.getValue()
    const filteredCharacters = currentCharacters.filter(
      c => (c.name + " " + c.description).toLowerCase()
        .includes(searchString.toLowerCase())
    )
    console.log(filteredCharacters);

    this.charactersFiltered.next(filteredCharacters);
  }


}
