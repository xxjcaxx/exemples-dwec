import { Component, Input } from '@angular/core';
import { IRecipe } from '../i-recipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  imports: [RouterLink],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {

  @Input({ required: true,  }) recipe!: IRecipe;


}
