import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-create-recipe',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css',
})
export class CreateRecipeComponent implements OnInit {
  @Input('id') recipeID?: string;
  mealForm: FormGroup;

  constructor(
    private supaService: SupabaseService,
    private formBuilder: FormBuilder
  ) {
    this.mealForm = this.formBuilder.group({
      strMeal: ['', [Validators.required]],
      strInstructions: ['', [Validators.required]],
      ingredients: this.formBuilder.array([]),
    });
  }

  get strMealValid() {
    return (
      this.mealForm.get('strMeal')?.valid &&
      this.mealForm.get('strMeal')?.touched
    );
  }

  ngOnInit(): void {
    if (this.recipeID) {
      // falta demanar tots els ingredients (id, nom)
      this.supaService.getMeals(this.recipeID).subscribe({
        next: (meals) => {
          this.mealForm.reset(meals[0]);
          meals[0].idIngredients.forEach(i=>{
            if(i){
              (<FormArray>this.mealForm.get('ingredients')).push(
                this.generateIngredientControl(i)
             )
            }
          })
     
        },
        error: (err) => console.log(err),
        complete: () => console.log('Received'),
      });
    }
  }

  getIngredientControl(): FormControl {
    const control = this.formBuilder.control('');
    control.setValidators(Validators.required);
    return control;
  }

  generateIngredientControl(id: string): FormControl {
    const control = this.formBuilder.control(id);
    control.setValidators(Validators.required);
    return control;
  }

  get IngredientsArray(): FormArray {
    return <FormArray>this.mealForm.get('ingredients');
  }

  addIngredient() {
    (<FormArray>this.mealForm.get('ingredients')).push(
      this.getIngredientControl()
    );
  }
  delIngredient(i: number) {   
    (<FormArray>this.mealForm.get('ingredients')).removeAt(i);
  }
}
