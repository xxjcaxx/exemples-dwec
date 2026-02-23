import { Routes } from '@angular/router';
import { CharactersKanban } from './components/characters-kanban/characters-kanban';
import { CharacterForm } from './components/character-form/character-form';

export const routes: Routes = [
    { path: 'home', component: CharactersKanban },
    { path: 'form', component: CharacterForm },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
