import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  map,
  BehaviorSubject,
  Subject,
  catchError,
  throwError,
} from 'rxjs';
import { Player } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  url = 'https://dwec-daw-default-rtdb.firebaseio.com/negocity/players';

  playerSubject = new Subject<Player>();

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<{ [key: string]: Player }>(this.url + '.json').pipe(
      map((sObjecte) => Object.entries(sObjecte)),
      map((sArray) =>
        sArray.map((s) => {
          s[1].id = s[0];
          return s[1];
        })
      )
    );
  }

  getPlayer(id: string): Observable<Player> {
    console.log(`player ${id}`);

    this.http
      .get<Player>(`${this.url}/${id}.json`)
      .pipe(
        map((s) => {
          s.id = id;
          return s;
        }),
        catchError((resp: HttpErrorResponse) =>
          throwError(() => new Error(`Error de player: ${resp.message}`))
        )
      )
      .subscribe((p) => this.playerSubject.next(p));
    return this.playerSubject;
  }

  createPlayer(player: Player) {
    let newPlayer: any = { ...player };
    delete newPlayer.id;
    return this.http.put<Player>(
      this.url + `/${player.id}.json`,
      JSON.stringify(newPlayer)
    );
  }
}
