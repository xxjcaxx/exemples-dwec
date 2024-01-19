import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }
  public searchFilter: BehaviorSubject<string> = new BehaviorSubject('');
}
