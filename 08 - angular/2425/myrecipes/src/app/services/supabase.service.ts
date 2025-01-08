import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  constructor(private http: HttpClient) { }

  getRecipes(){
    return 'hola'
  }

  getCharacters(): Observable<any>{
        return this.http.get('https://rickandmortyapi.com/api/character/?page=19')
  }
}
