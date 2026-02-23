import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root',
})
export class Characters {
  http: HttpClient = inject(HttpClient);


  getCharacters(): Observable<Character[]>{
    return this.http.get<{items: Character[]}>(`https://dragonball-api.com/api/characters`)
    .pipe(
      map(response => response.items)
    )
  }
}
