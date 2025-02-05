import { Component, Input, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { IRecipe } from '../i-recipe';
import { IngredientComponent } from "../ingredient/ingredient.component";
import { Ingredient } from '../ingredient';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-recipe-detail',
  imports: [IngredientComponent, RouterLink],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{

  @Input('id') recipeID?: string;
  public recipe: IRecipe | undefined;
  public ingredients: Ingredient[] = [];
  public srcPDF: SafeResourceUrl = '';
  public PDFbase64: SafeResourceUrl = '';
  public file?: File;


  constructor(private supabaseService: SupabaseService,
    private sanitizer: DomSanitizer,

  ){
 
  }

  ngOnInit(): void {

    this.supabaseService.getMeals(this.recipeID).subscribe({
      next: meals => {
       this.recipe = meals[0];
      this.supabaseService.getIngredients(this.recipe?.idIngredients).subscribe({
        next: ingredients => {
          this.ingredients.push(ingredients);
        }
      });
      },
      error: err => console.log(err),
      complete: ()=> console.log('Received')
    })
  }

  loadPDF(){
    this.supabaseService.getPDF(this.recipe!).subscribe(pdf => {
      console.log(pdf);
      
      this.srcPDF = this.sanitizer.bypassSecurityTrustResourceUrl(pdf);
    });
  }

  loadPDFBase64(){
    this.PDFbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(this.supabaseService.getPDFBase64(this.recipe!));
  }
  loadPDFBase64blob(){
    this.PDFbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(this.supabaseService.getPDFBase64blob(this.recipe!));
  }


  asignarPDF($event: Event){
    $event.preventDefault();
    this.supabaseService.assignPDF(this.file!,this.recipe!);
    

  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.srcPDF = this.sanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(this.file));
    }
  }


}
