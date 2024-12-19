import { Component, Input } from '@angular/core';
import { IRecipe } from '../i-recipe';

@Component({
  selector: '[app-recipe-table-row]',
  imports: [],
  templateUrl: './recipe-table-row.component.html',
  styleUrl: './recipe-table-row.component.css'
})
export class RecipeTableRowComponent {
  @Input({ required: true,  }) recipe!: IRecipe;
}
