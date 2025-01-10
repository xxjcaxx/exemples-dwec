import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../heroe.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulari',
  templateUrl: './formulari.component.html',
  styleUrls: ['./formulari.component.css']
})
export class FormulariComponent implements OnInit {


  formHeroe: FormGroup;

  constructor(
    private hService: HeroeService,
    private fb: FormBuilder
  ) {

this.formHeroe = fb.group({
  id: ['',[Validators.required]],
  name: ['',[Validators.required]],
  date: [''],
  level: [0]
});

  }

  ngOnInit(): void {
  }

  crear(){
    this.hService.createHero(this.formHeroe.value);
  }

}
