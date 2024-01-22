import { Routes } from '@angular/router';
import { ArtworkListComponent } from './components/artwork-list/artwork-list.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ArtworkComponent } from './components/artwork/artwork.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {path: 'artworks', component: ArtworkListComponent},
  {path: 'artwork/:id', component: ArtworkComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'userManagement/:setmode', component: LoginComponent},
  {path: 'userManagement/:logout', component: LoginComponent},
  { path: '**', component: ArtworkListComponent }

];
