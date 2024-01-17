import { Routes } from '@angular/router';
import { ArtworkListComponent } from './components/artwork-list/artwork-list.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const routes: Routes = [
  {path: 'artworks', component: ArtworkListComponent},
  {path: 'favorites', component: FavoritesComponent},
  { path: '**', component: ArtworkListComponent }

];
