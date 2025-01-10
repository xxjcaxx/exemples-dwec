import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { datos } from '../datos';
import { IEdifici } from '../interfaces/i-edifici';

@Injectable({
  providedIn: 'root'
})
export class EdificisService {

  urlEdificis = '/assets/ruta-modernista.geojson.json';

  constructor(private http: HttpClient) { }


  getFeatures():Observable<IEdifici[]>{
    const datos = this.http.get<{features : IEdifici[]}>(this.urlEdificis)
    .pipe(map(dato => dato.features));
    //datos.subscribe(d=> console.log(d));
    return datos;
  }








  getEdificis():IEdifici[]{
    return datos.features;
  }

  getEdifici(id:number):IEdifici | undefined{
    return datos.features.find(d=> d.properties.id == id);
  }
}
