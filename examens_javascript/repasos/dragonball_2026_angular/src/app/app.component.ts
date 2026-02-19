import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharactersKanbanComponent } from './components/characters-kanban/characters-kanban.component';
import { CharactersSearchFormComponent } from './components/characters-search-form/characters-search-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  CharactersSearchFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
