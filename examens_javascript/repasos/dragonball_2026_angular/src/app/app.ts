import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharactersKanban } from './components/characters-kanban/characters-kanban';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CharactersKanban],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('dragonball_2026_angular');
}
