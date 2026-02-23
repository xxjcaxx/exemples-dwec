import { Component, inject } from '@angular/core';
import { Characters } from '../../services/characters';
import { toSignal } from '@angular/core/rxjs-interop';
import { CharactersKanbanItem } from '../characters-kanban-item/characters-kanban-item';

@Component({
  selector: 'app-characters-kanban',
  imports: [CharactersKanbanItem],
  templateUrl: './characters-kanban.html',
  styleUrl: './characters-kanban.scss',
})
export class CharactersKanban {


 charactersService: Characters = inject(Characters);
 characters = toSignal(this.charactersService.getCharacters())


}
