import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, Subject, mergeMap } from 'rxjs';
import { City } from '../interfaces/city';

@Injectable({
  providedIn: 'root',
})
export class CitysService {
  citiesSubject = new Subject<City[]>();

  url = 'https://dwec-daw-default-rtdb.firebaseio.com/negocity/cities';

  private httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    const obsCities = this.http
      .get<{ [key: string]: City }>(this.url + '.json')
      .pipe(
        map((sObjecte) => Object.entries(sObjecte)),
        map((sArray) =>
          sArray.map((s) => {
            s[1].id = s[0];
            return s[1];
          })
        )
      )
      .subscribe((cities) => this.citiesSubject.next(cities));

    return this.citiesSubject;
  }

  getCity(id: string): Observable<City> {
    return this.http.get<City>(`${this.url}/${id}.json`).pipe(
      map((s) => {
        s.id = id;
        return s;
      })
    );
  }

  deleteCity(id: string) {
    this.http
      .delete<City>(`${this.url}/${id}.json`)
      .pipe(mergeMap(() => this.getCities()))
      .subscribe(() => {});
  }

  public createRandomCity() {
    let newCity = {
      name: 'new City',
      survivors: [],
    };

    this.http
      .post<City>(this.url + '.json', JSON.stringify(newCity))
      .pipe(mergeMap(() => this.getCities()))
      .subscribe(() => {});

    // mergeMap espera al primer valor de l'Observable del POST per inicial el Observable que retorna getSurvivors
    // El pipe retorna un Observable
  }
}
