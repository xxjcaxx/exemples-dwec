import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { City } from '../../../interfaces/city';

@Component({
  selector: 'app-cities-item',
  templateUrl: './cities-item.component.html',
  styleUrls: ['./cities-item.component.css']
})
export class CitiesItemComponent implements OnInit {


  @Input() city: City = {id:'',name:'undefined', survivors: []};
  @Output() eventDeleteCity = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteCity(){
    this.eventDeleteCity.emit(this.city.id)
  }


}
