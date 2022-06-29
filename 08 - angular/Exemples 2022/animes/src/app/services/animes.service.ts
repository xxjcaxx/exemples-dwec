import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Anime } from '../interfaces/anime';

@Injectable({
  providedIn: 'root'
})
export class AnimesService {

  private url = "https://dwec-daw-default-rtdb.firebaseio.com/animes/data"

  constructor(private http:HttpClient) { }

  getAnimes(start:number):Observable<Anime[]>{
    return this.http.get<{ [key: string]: Anime }>(`${this.url}.json?orderBy="$key"&startAt="${start}"&endAt="${start+20}"`)
    .pipe(
      map(aObjecte => Object.entries(aObjecte)),
      map(Array => Array.map(a => {a[1].id = a[0];  return a[1]} )));
  }

  getAnime(id:number):Observable<Anime>{
    return this.http.get<Anime>(`${this.url}/${id}.json`)
  }
}
