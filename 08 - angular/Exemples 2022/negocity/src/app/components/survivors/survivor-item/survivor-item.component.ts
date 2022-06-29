import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Survivor } from '../../../interfaces/survivor';

@Component({
  selector: 'app-survivor-item',
  templateUrl: './survivor-item.component.html',
  styleUrls: ['./survivor-item.component.css']
})
export class SurvivorItemComponent implements OnInit {

  @Input() survivor: Survivor = {id:'',name:'undefined',health:0,damage:0,shield:0,city:''};
  @Output() eventDeleteSurvivor = new EventEmitter<string>();

  mode: string = 'view';

  constructor() {

   }

  ngOnInit(): void {
  }

  deleteSurvivor(){
    this.eventDeleteSurvivor.emit(this.survivor.id)
  }

  editSurvivor(){
    this.mode = 'edit';
  }

  changeMode($event: string){
    this.mode = $event;
  }

  updateSurvivor($event:Survivor){
    this.survivor = $event;
  }


}
