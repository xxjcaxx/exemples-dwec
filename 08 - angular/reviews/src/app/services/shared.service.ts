import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  filtre : BehaviorSubject<string>;

  constructor() { this.filtre = new BehaviorSubject('') }

  

}
