import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordDirective,
    multi: true}]
})
export class PasswordDirective {

  constructor() { }
  validate( input: AbstractControl): { [key: string]: any} | null{
    

    if(input.value){
      if (!/^.{8}/.test(input.value)){
        return { appPassword: true }
      }
      if (!/[A-Z]/.test(input.value)){
        return { appPassword: true }
      }
      if (!/[0-9]/.test(input.value)){
        return { appPassword: true }
      }
    }
    return null;
  }
}
