import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { RecipeTableComponent } from './recipes/recipe-table/recipe-table.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { SharedRecipesListComponent } from './recipes/shared-recipes-list/shared-recipes-list.component';
import { SharedRecipesComponent } from './recipes/shared-recipes/shared-recipes.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { supabaseLoginGuard } from './guards/supabase-login.guard';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'main', component: MainComponent},
    {path: 'table', component: RecipeTableComponent, canActivate: [supabaseLoginGuard]},
    {path: 'recipes/:id', component: RecipeDetailComponent},
    {path: 'create_recipe', component: CreateRecipeComponent},
    {path: 'edit_recipe/:id', component: CreateRecipeComponent},
    {path: 'sharedrecipes', component: SharedRecipesListComponent},
    {path: 'sharedrecipes/:id', component: SharedRecipesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}

];
