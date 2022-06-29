import { Component, OnInit } from '@angular/core';
import { Survivor } from '../../../interfaces/survivor';
import { SurvivorsService } from '../../../services/survivors.service';

@Component({
  selector: 'app-survivor-list',
  templateUrl: './survivor-list.component.html',
  styleUrls: ['./survivor-list.component.css']
})
export class SurvivorListComponent implements OnInit {

  survivors: Survivor[] = [];

  constructor(private sService: SurvivorsService) { }

  ngOnInit(): void {
      this.sService.getSurvivors().subscribe(s=> this.survivors = s);

  }

  createRandom(){
    //console.log('random');

    this.sService.createRandomSurvivor().subscribe(s => this.survivors = s);
  }

  deleteSurvivor($event:string,survivor:Survivor){
    this.sService.deleteSurvivor(survivor.id).subscribe(s => this.survivors = s);

  }

}
