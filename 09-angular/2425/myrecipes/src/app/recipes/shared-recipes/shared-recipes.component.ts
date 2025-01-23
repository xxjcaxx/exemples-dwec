import { Component, Input, OnInit } from '@angular/core';
import { ISharedRecipe } from '../i-shared-recipe';
import { SupabaseService } from '../../services/supabase.service';
import { IngredientComponent } from "../ingredient/ingredient.component";
import { Ingredient } from '../ingredient';

@Component({
  selector: 'app-shared-recipes',
  imports: [IngredientComponent],
  templateUrl: './shared-recipes.component.html',
  styleUrl: './shared-recipes.component.css'
})
export class SharedRecipesComponent implements OnInit {
  @Input('id') id?: string;

  recipe?: ISharedRecipe;
  instructions?: {step: number, phrase: string}[] = [];
  public ingredients: Ingredient[] = [];


  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.supabaseService.getSharedRecipes(this.id).subscribe((recipes: ISharedRecipe[]) => {
      this.recipe = recipes[0];
      this.instructions = this.recipe.meals?.strInstructions?.split('.').map((i,$i) => ({step: $i, phrase: i}))
      this.supabaseService.getIngredients(this.recipe?.meals?.idIngredients).subscribe({
        next: ingredients => {
          this.ingredients.push(ingredients);
        }
      });
    });


  }





}
