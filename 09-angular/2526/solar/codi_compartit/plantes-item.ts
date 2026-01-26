import { Component, input, output } from '@angular/core';
import { Planta } from '../planta';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-plantes-item',
  imports: [RouterLink],
  templateUrl: './plantes-item.html',
  styleUrl: './plantes-item.css',
})
export class PlantesItem {

  planta = input.required<Planta>();

  favitoreToggled = output<void>()

  toggleFavorite(){
    this.favitoreToggled.emit()
    //this.planta().favorite = !this.planta().favorite;
  }

}
