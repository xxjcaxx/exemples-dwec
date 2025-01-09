import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { RecipeTableComponent } from './recipes/recipe-table/recipe-table.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { SharedRecipesListComponent } from './recipes/shared-recipes-list/shared-recipes-list.component';
import { SharedRecipesComponent } from './recipes/shared-recipes/shared-recipes.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'main', component: MainComponent},
    {path: 'table', component: RecipeTableComponent},
    {path: 'recipes/:id', component: RecipeDetailComponent},
    {path: 'sharedrecipes', component: SharedRecipesListComponent},
    {path: 'sharedrecipes/:id', component: SharedRecipesComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}

];
