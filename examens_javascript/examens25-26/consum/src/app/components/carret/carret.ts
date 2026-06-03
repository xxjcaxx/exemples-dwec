import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Consum } from '../../services/consum';
import { form, FormField, pattern, required } from '@angular/forms/signals';
import { NgClass } from '@angular/common';


interface ICarret {
  nom: string;
  direccio: string;
  tarjeta: string;
}

@Component({
  selector: 'app-carret',
  imports: [FormField, NgClass],
  templateUrl: './carret.html',
  styleUrl: './carret.scss',
})
export class Carret {

  consumService: Consum = inject(Consum);

  products = toSignal(this.consumService.carret, { initialValue: [] });

  total = computed(() => Number(this.products().reduce((acc, product) => acc + product.price, 0)).toFixed(2));

  carretModel = signal<ICarret>({
    nom: '',
    direccio: '',
    tarjeta: ''
  })

  carretForm = form(this.carretModel, (schemaPath) => {
    required(schemaPath.nom, {message: "El nom és requerit"});
    required(schemaPath.direccio, {message: "la direcció és requerida"});
    required(schemaPath.tarjeta, {message: "la tarjeta és requerida"});
    pattern(schemaPath.tarjeta,/^[0-9 ]+/,{message: "La tarjeta ha de tenir el format adequat"})
});

getNomValid(){
  if (this.carretForm.nom().touched() && this.carretForm.nom().invalid()){
    return 'is-invalid'
  }
   if (this.carretForm.nom().touched() && this.carretForm.nom().valid()){
    return 'is-valid'
  }
  return null;
}

getDireccioValid(){
  if (this.carretForm.direccio().touched() && this.carretForm.direccio().invalid()){
    return 'is-invalid'
  }
   if (this.carretForm.direccio().touched() && this.carretForm.direccio().valid()){
    return 'is-valid'
  }
  return null;
}

getTarjetaValid(){
  if (this.carretForm.tarjeta().touched() && this.carretForm.tarjeta().invalid()){
    return 'is-invalid'
  }
   if (this.carretForm.tarjeta().touched() && this.carretForm.tarjeta().valid()){
    return 'is-valid'
  }
  return null;
}



}
