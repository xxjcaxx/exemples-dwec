import { Component } from '@angular/core';
import { RecipesListComponent } from '../../recipes/recipes-list/recipes-list.component';

@Component({
  selector: 'app-main',
  imports: [RecipesListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
