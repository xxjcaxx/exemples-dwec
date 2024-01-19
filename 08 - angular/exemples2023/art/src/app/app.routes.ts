import { Routes } from '@angular/router';
import { ArtworkListComponent } from './components/artwork-list/artwork-list.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ArtworkComponent } from './components/artwork/artwork.component';

export const routes: Routes = [
  {path: 'artworks', component: ArtworkListComponent},
  {path: 'artwork/:id', component: ArtworkComponent},
  {path: 'favorites', component: FavoritesComponent},
  { path: '**', component: ArtworkListComponent }

];
