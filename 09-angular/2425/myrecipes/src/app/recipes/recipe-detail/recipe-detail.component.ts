import { Component, Input, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { IRecipe } from '../i-recipe';
import { IngredientComponent } from "../ingredient/ingredient.component";
import { Ingredient } from '../ingredient';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  imports: [IngredientComponent, RouterLink],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{

  @Input('id') recipeID?: string;
  public recipe: IRecipe | undefined;
  public ingredients: Ingredient[] = [];

  constructor(private supabaseService: SupabaseService){

  }

  ngOnInit(): void {

    this.supabaseService.getMeals(this.recipeID).subscribe({
      next: meals => {
       this.recipe = meals[0];
      this.supabaseService.getIngredients(this.recipe?.idIngredients).subscribe({
        next: ingredients => {
          this.ingredients.push(ingredients);
        }
      });
      },
      error: err => console.log(err),
      complete: ()=> console.log('Received')
    })
  }


}
