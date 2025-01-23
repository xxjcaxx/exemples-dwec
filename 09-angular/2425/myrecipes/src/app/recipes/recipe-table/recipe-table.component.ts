import { Component, OnInit } from '@angular/core';
import { IRecipe } from '../i-recipe';
import {recipes, RecipesType} from "../recipes-list/recipes_exemples"
import { RecipeTableRowComponent } from "../recipe-table-row/recipe-table-row.component";
import { SupabasewebsocketService } from '../../services/supabasewebsocket.service';
import { FilterPipe } from "../../pipes/filter.pipe";
import { SearchServiceService } from '../../services/search-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-table',
  imports: [RecipeTableRowComponent, FilterPipe],
  templateUrl: './recipe-table.component.html',
  styleUrl: './recipe-table.component.css'
})
export class RecipeTableComponent  implements OnInit{
  public recipes: IRecipe[] = recipes;
  public searchValue: string = '';
  private searchSubscription?: Subscription;
  constructor(private searchService: SearchServiceService){}

  ngOnInit(): void {
    this.searchSubscription = this.searchService.searchSubject.
    //  pipe(map(searchValue => searchValue.toLowerCase()))
      subscribe(searchValue =>{
      this.searchValue = searchValue;
      /*  this.recipes = this.allRecipes.filter(recipe => recipe.strMeal?.toLowerCase().includes(searchValue)
         || recipe.strInstructions?.toLowerCase().includes(searchValue))*/
  
      })
  }

}
