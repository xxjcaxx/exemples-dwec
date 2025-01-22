import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { IRecipe } from '../i-recipe';
import { ISharedRecipe } from '../i-shared-recipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shared-recipes-list',
  imports: [RouterLink],
  templateUrl: './shared-recipes-list.component.html',
  styleUrl: './shared-recipes-list.component.css'
})
export class SharedRecipesListComponent {

  recipes: ISharedRecipe[]= [];

  constructor(private supabaseService: SupabaseService) { }


  ngOnInit() {
    this.supabaseService.getSharedRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

}
