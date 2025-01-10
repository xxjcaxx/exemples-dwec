import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{

  @Input('id') recipeID?: string;
  
  constructor(){

  }

  ngOnInit(): void {

    
  }


}
