import { Component, Input, OnInit, Output } from '@angular/core';
import { IEdifici } from 'src/app/interfaces/i-edifici';
import { EventEmitter } from '@angular/core';

@Component({
  selector: '[app-edifici]',
  templateUrl: './edifici.component.html',
  styleUrls: ['./edifici.component.css']
})
export class EdificiComponent implements OnInit {

  @Input() punto: IEdifici | undefined;
  @Input() ratting: number | undefined;
  @Output() nameChanged = new EventEmitter<string>();
  @Output() rattingChanged = new EventEmitter<number>();
  @Output() positionChanged = new EventEmitter<number>();
  name : string;
  ratting_input : number = 0;
  ratting_aux : number = 0;


  constructor() {
   this.name = '';
   }

  ngOnInit(): void {
    this.punto = this.punto ? this.punto : {
      type: "undefined",
      properties: {
          descripcio: "Indefinit",
          orden: 0,
          pdf: "",
          foto:"",
          fotow:"",
          web_turismo: "",
          web_turismow : "",
          como_llegar: "",
          como_llegarw: "",
          id: 0,
          ratting: 0,
      },
      geometry: {
          type: "",
          coordinates : [[0,0]],
      },
  };
    this.name = this.punto.properties.descripcio;
    this.ratting = this.ratting ? this.ratting : 0;
    this.ratting_input = this.ratting;
    this.ratting_aux = this.ratting;
  }

  canviarNom(){
    this.nameChanged.emit(this.name);
  }

  canviarRatting(){
    this.rattingChanged.emit(this.ratting_input);
  }

  canviarRattingAux(r : number){
    this.rattingChanged.emit(r);
  }

  canviarPosicio(n: number){
    this.positionChanged.emit(n);
  }
}
