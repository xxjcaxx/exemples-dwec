import { Component, OnInit } from '@angular/core';
import { City } from '../../../interfaces/city';
import { CitysService } from '../../../services/citys.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent implements OnInit {


  cities: City[] = [];

  constructor(private cService: CitysService) { }

  ngOnInit(): void {
    this.cService.getCities().subscribe(s=> this.cities = s);
  }

  deleteCity($event:string,city:City){
    this.cService.deleteCity(city.id);
  }

  createRandom(){
   this.cService.createRandomCity();
  }

}
