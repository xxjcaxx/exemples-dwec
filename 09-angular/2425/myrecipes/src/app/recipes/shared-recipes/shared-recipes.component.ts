import { Component, Input, OnInit } from '@angular/core';
import { ISharedRecipe } from '../i-shared-recipe';
import { SupabaseService } from '../../services/supabase.service';
import { IngredientComponent } from "../ingredient/ingredient.component";
import { Ingredient } from '../ingredient';
import { User } from '@supabase/supabase-js';
import { StringToEmojiPipe } from '../../pipes/string-to-emoji.pipe';
import { SupabasewebsocketService } from '../../services/supabasewebsocket.service';
import { CommonModule } from '@angular/common';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-shared-recipes',
  imports: [IngredientComponent, StringToEmojiPipe, CommonModule],
  templateUrl: './shared-recipes.component.html',
  styleUrl: './shared-recipes.component.css'
})
export class SharedRecipesComponent implements OnInit {
  @Input('id') id?: string;

  recipe?: ISharedRecipe;
  instructions?: { step: number, phrase: string }[] = [];
  public ingredients: Ingredient[] = [];
  public user?: User;
  public usersByStep: { [step: number]: string[] } = {};

  constructor(
    private supabaseService: SupabaseService,
    private supabasewebsocketService: SupabasewebsocketService
  ) { }

  ngOnInit(): void {
    this.supabaseService.getSharedRecipes(this.id).subscribe((recipes: ISharedRecipe[]) => {
      this.recipe = recipes[0];
      this.instructions = this.recipe.meals?.strInstructions?.split('.').map((i, $i) => ({ step: $i, phrase: i }))
      this.supabaseService.getIngredients(this.recipe?.meals?.idIngredients).subscribe({
        next: ingredients => {
          this.ingredients.push(ingredients);
        }
      }); ////

      // Connexió al subject
      this.supabasewebsocketService.getsharedRecipesChannel(Number(this.recipe?.id)).pipe(
        startWith(null)
      ).subscribe(
        (events: any) => {
          console.log(events);
          events && this.recipe!.shared_recipes_events.push(events.new);

          let stepsByUser: { [user: string]: number } = this.recipe!.shared_recipes_events.reduce((acc: { [user: string]: number }, event: any) => {
            acc[event.user] = event.step;
            return acc;
          }, {});

          this.usersByStep = Object.entries(stepsByUser).reduce((acc: { [step: string]: string[] }, [user, step]) => {
            if (!acc[step]) {
              acc[step] = [];
            }
            acc[step].push(user);
            return acc;
          }, {});

        }
      );

    });


    this.supabaseService.getUserInfo().subscribe(user => {
      this.user = user;
    });





  }

  joinInstruction(instruction: number){
        if (this.recipe?.id !== undefined && this.user?.id !== undefined){ {
      const recipeID = Number(this.recipe?.id);
      this.supabaseService.createSharedRecipesEvents(recipeID, instruction, this.user.id).subscribe();
    }
  }
}





}






