import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor() { }


  searchSubject: BehaviorSubject<string> = new BehaviorSubject('');

}
