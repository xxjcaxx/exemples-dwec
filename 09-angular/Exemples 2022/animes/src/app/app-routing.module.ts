import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeListComponent } from './components/anime-list/anime-list.component';
import { AnimeDetailComponent } from './components/anime-detail/anime-detail.component';

const routes: Routes = [
  {path: 'list', component: AnimeListComponent},
  {path: 'list/:page', component: AnimeListComponent},
   {path: 'anime/:id',  component: AnimeDetailComponent},

   {path: '**', pathMatch: 'full', redirectTo: 'list'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
