import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILinea } from 'src/app/interfaces/i-linea';
import { LineServiceService } from 'src/app/services/line-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  lineas: ILinea[] = [];
  mitjana?: ILinea;
  filtreC: string = '';

  lineForm: FormGroup;
  constructor(private fb: FormBuilder,
     private http:LineServiceService,
     private route: ActivatedRoute

     ) {
    this.lineForm = this.fb.group({
      id: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      ventas: [0, [Validators.required]],
      clientes: [0, [Validators.required]],
      visitas: [0, [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.http.lines.subscribe(l=> this.lineas = l);
    this.http.mitjana.subscribe(m=> this.mitjana = m);
    this.http.getLines();
    this.route.params.subscribe(p => this.filtreC = p['ciutat'])
  }

  fieldNotValid(name:string){
    if(this.lineForm.get(name)?.invalid && this.lineForm.get(name)?.touched)
    return 'is-invalid';
    else if(this.lineForm.get(name)?.valid && this.lineForm.get(name)?.touched)
    return 'is-valid';
    return '';
  }

  crear(){
    this.http.createLine(this.lineForm.value);
  }

  borrar($event:string){
    let id = $event;
    this.http.deleteLine(id);

  }

}
