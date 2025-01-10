import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ILinea } from '../interfaces/i-linea';

@Injectable({
  providedIn: 'root'
})
export class LineServiceService {

  constructor(private http: HttpClient) { }

  lines = new BehaviorSubject<ILinea[]>([]);
  mitjana = new BehaviorSubject<ILinea>({id: 'mitjana', ciudad: '', ventas: 0, clientes: 0, visitas: 0 })
  url = `https://dwecexamen-default-rtdb.firebaseio.com/lines`;

  getLines(){
    this.http.get(this.url+'.json').pipe(
      map( sObjecte => Object.entries(sObjecte)),
      map( sArray => sArray.map(s=> { s[1].id = s[0]; return s[1]}))
    ).subscribe((l:ILinea[])=> {
      this.lines.next(l);
      let mit:ILinea = {id: 'mitjana', ciudad: '',
      ventas: Math.round((l.reduce((a,b)=> a + Number(b.ventas), 0)/l.length)*100)/100,
      clientes: Math.round((l.reduce((a,b)=> a + Number(b.clientes), 0)/l.length)*100)/100,
      visitas: Math.round((l.reduce((a,b)=> a + Number(b.visitas), 0)/l.length)*100)/100};
      this.mitjana.next(mit);


     });

  }



  createLine(line:ILinea){
    this.http.post(this.url+'.json',JSON.stringify(line))
    .subscribe(()=>{ this.getLines()})
  }

  deleteLine(id:string){
    this.http.delete(this.url+`/${id}.json`)
    .subscribe(()=>{ this.getLines()})
  }

}
