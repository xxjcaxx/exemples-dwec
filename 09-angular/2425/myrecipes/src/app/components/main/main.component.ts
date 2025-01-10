import { Component } from '@angular/core';
import { RecipesListComponent } from '../../recipes/recipes-list/recipes-list.component';
import { RecipeTableComponent } from '../../recipes/recipe-table/recipe-table.component';

@Component({
  selector: 'app-main',
  imports: [RecipesListComponent,],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
