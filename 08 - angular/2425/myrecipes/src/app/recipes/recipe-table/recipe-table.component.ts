import { Component } from '@angular/core';
import { IRecipe } from '../i-recipe';
import {recipes, RecipesType} from "../recipes-list/recipes_exemples"
import { RecipeTableRowComponent } from "../recipe-table-row/recipe-table-row.component";

@Component({
  selector: 'app-recipe-table',
  imports: [RecipeTableRowComponent],
  templateUrl: './recipe-table.component.html',
  styleUrl: './recipe-table.component.css'
})
export class RecipeTableComponent {
  public recipes: IRecipe[] = recipes;


}
