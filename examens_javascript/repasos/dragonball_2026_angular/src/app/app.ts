import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CharactersKanban } from './components/characters-kanban/characters-kanban';
import { FormsModule } from '@angular/forms';
import { Characters } from './services/characters';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  searchString = signal('');

  charactersService: Characters = inject(Characters);
  protected readonly title = signal('dragonball_2026_angular');

  search(){
    console.log(this.searchString());
    this.charactersService
    .searchCharacters(this.searchString()); 

  }

}
