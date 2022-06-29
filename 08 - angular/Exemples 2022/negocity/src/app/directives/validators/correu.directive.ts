import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appCorreu]',
  providers: [{provide: NG_VALIDATORS, useExisting: CorreuDirective,
    multi: true}]
})
export class CorreuDirective {

  constructor() { }

  validate( input: AbstractControl): { [key: string]: any} | null{


    if(input.value){
      if (!/^.+@.+\..+/.test(input.value)){
        return { appCorreu: true }
      }
    }
    return null;
  }

}
