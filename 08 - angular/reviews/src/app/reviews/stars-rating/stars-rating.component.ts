import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.css']
})
export class StarsRatingComponent implements OnInit {
  @Input() overall: number = 3;

  @Output() overallChanged = new EventEmitter<number>();

  auxOverall = 0;

  restaurarOverall(){
    this.auxOverall = this.overall;
  }

  ngOnInit(){
    this.restaurarOverall();
  }

  puntuar(i:number): void{
    this.overallChanged.emit(this.auxOverall);
  }

}
