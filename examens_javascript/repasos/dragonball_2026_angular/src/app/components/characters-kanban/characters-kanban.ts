import { Component, inject, OnInit } from '@angular/core';
import { Characters } from '../../services/characters';
import { toSignal } from '@angular/core/rxjs-interop';
import { CharactersKanbanItem } from '../characters-kanban-item/characters-kanban-item';

@Component({
  selector: 'app-characters-kanban',
  imports: [CharactersKanbanItem],
  templateUrl: './characters-kanban.html',
  styleUrl: './characters-kanban.scss',
})
export class CharactersKanban implements OnInit{


 charactersService: Characters = inject(Characters);
 characters = toSignal(this.charactersService.charactersFiltered);


 ngOnInit(): void {
   this.charactersService.getCharacters();
 }

}
