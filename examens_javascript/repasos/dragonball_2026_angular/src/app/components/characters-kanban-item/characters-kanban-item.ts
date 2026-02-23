import { Component, input } from '@angular/core';
import { Character } from '../../interfaces/character';

@Component({
  selector: 'app-characters-kanban-item',
  imports: [],
  templateUrl: './characters-kanban-item.html',
  styleUrl: './characters-kanban-item.scss',
})
export class CharactersKanbanItem {


  character = input.required<Character>()
}
