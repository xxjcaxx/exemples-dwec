import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {recipes, RecipesType} from "./recipes_exemples"
import { IRecipe } from '../i-recipe';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipes-list',
  imports: [CommonModule, RecipeCardComponent],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent implements OnInit {

  public recipes: IRecipe[] = [];

  ngOnInit(): void {
    this.recipes = recipes;
  }

  


}
