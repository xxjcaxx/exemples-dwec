import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import {recipes, RecipesType} from "./recipes_exemples"
import { IRecipe } from '../i-recipe';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { SupabaseService } from '../../services/supabase.service';
import { map, Subscription } from 'rxjs';
import { SearchServiceService } from '../../services/search-service.service';
import { FilterPipe } from "../../pipes/filter.pipe";

@Component({
  selector: 'app-recipes-list',
  imports: [CommonModule, RecipeCardComponent, FilterPipe],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent implements OnInit, OnDestroy {

  constructor(private supabaseService: SupabaseService,
    private searchService: SearchServiceService
  ){}

  public recipes: IRecipe[] = [];
  public allRecipes: IRecipe[] = [];
  public characters: any[] = [];
  private searchSubscription?: Subscription;
  public searchValue: string = '';
 // private intervalSubscritor?: Subscription;
 // public n = 0;

  ngOnInit(): void {

    this.supabaseService.getMeals().subscribe({
      next: meals => {
       console.log(meals);
       this.recipes = meals;
       this.allRecipes = meals;
      },
      error: err => console.log(err),
      complete: ()=> console.log('Received')
    })

    this.searchSubscription = this.searchService.searchSubject.
  //  pipe(map(searchValue => searchValue.toLowerCase()))
    subscribe(searchValue =>{
    this.searchValue = searchValue;
    /*  this.recipes = this.allRecipes.filter(recipe => recipe.strMeal?.toLowerCase().includes(searchValue)
       || recipe.strInstructions?.toLowerCase().includes(searchValue))*/

    })


  /*  this.recipes = recipes;
    console.log(this.supabaseService.getRecipes());
    this.supabaseService.getCharacters().subscribe(
       {
       next: characters => {console.log(characters);
        this.characters = characters;
         },
       error: err => console.error('Observer got an error: ' + err),
       complete: () => console.log('Observer got a complete notification'),
       }
    );
*/
    
/*

    const intervalObservable = this.supabaseService.getInterval();
    console.log(intervalObservable);
    this.intervalSubscritor = intervalObservable.subscribe(n => this.n = n)
   
  
    //setTimeout(()=> intervalSubscritor.unsubscribe(),5000)
    */
  }

  ngOnDestroy(): void {
   // this.intervalSubscritor?.unsubscribe();
   this.searchSubscription?.unsubscribe();
  }

  


}
