import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  formReview: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formReview = this.formBuilder.group({
      reviewText: ['', Validators.minLength(10)],
      overall: [0, [Validators.max(5),Validators.min(0),Validators.required]],
     });

  }

  

  get reviewNotValid(){
      if (this.formReview.get('reviewText')?.invalid 
      && this.formReview.get('reviewText')?.touched)  
        return 'is-invalid';
      if (this.formReview.get('reviewText')?.valid 
      && this.formReview.get('reviewText')?.touched)  
        return 'is-valid';
      return ''; 
  }
   
     
 
   
  


}
