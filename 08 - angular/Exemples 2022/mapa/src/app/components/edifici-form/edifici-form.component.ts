import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-edifici-form',
  templateUrl: './edifici-form.component.html',
  styleUrls: ['./edifici-form.component.css']
})
export class EdificiFormComponent implements OnInit {
  
  public edificiForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
   }

  crearFormulario(){
    this.edificiForm = this.formBuilder.group(
      {
        descripcio: ['DESCRIPCIO',[Validators.required, Validators.minLength(10)]],
        pdf: ['url pdf',[Validators.required, this.pdfValidator('pdf')]],
        foto: ['url foto',[Validators.required]]
      }
    )
  }

  pdfValidator(extensio: string): ValidatorFn {
    return (pdfInput: AbstractControl): { [key: string]: any } | null => {
      if(pdfInput.value){
        let expresio = new RegExp(`^http:\/\/.+\.${extensio}`)
        if (expresio.test(pdfInput.value)){
          return null;
        }
        else {
        return  {'pdfInvalid': 'El pdf és invalid'}
        }
      }
      else {
        return null;
      }
    }
    
  }

  ngOnInit(): void {

  }

  inputValid(input:string): string{
    if (this.edificiForm.get(input)?.invalid && this.edificiForm.get(input)?.touched){
      return 'is-invalid';
    }
    if (this.edificiForm.get(input)?.valid && this.edificiForm.get(input)?.touched){
      return 'is-valid';
    }
    return '';
  }


}
