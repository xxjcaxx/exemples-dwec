import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {recipes, RecipesType} from "./recipes_exemples"
import { IRecipe } from '../i-recipe';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-recipes-list',
  imports: [CommonModule, RecipeCardComponent],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent implements OnInit {

  constructor(private supabaseService: SupabaseService){}

  public recipes: IRecipe[] = [];
  public characters: any;

  ngOnInit(): void {
    this.recipes = recipes;
    console.log(this.supabaseService.getRecipes());
    this.supabaseService.getCharacters().subscribe(
     /*  characters => {console.log(characters);
      this.characters = characters;
       },*/
       {
       next: characters => {console.log(characters);
        this.characters = characters;
         },
       error: err => console.error('Observer got an error: ' + err),
       complete: () => console.log('Observer got a complete notification'),
       }
    )
  }

  


}
