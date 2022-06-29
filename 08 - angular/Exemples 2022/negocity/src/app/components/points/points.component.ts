import { Component, OnInit } from '@angular/core';
import { IPointSet } from 'src/app/interfaces/i-point-set';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  public graphData: IPointSet[] = [];

  constructor() { }

  ngOnInit(): void {

    this.graphData = [
      {
        name: 's1', 
        series: [
          {name: '1', value: 20},
          {name: '2', value: 10},
          {name: '3', value: 30},
          {name: '4', value: 20},
          {name: '5', value: 25},
          {name: '6', value: 21},
          {name: '7', value: 0},
          {name: '8', value: 2},
          {name: '9', value: 22},
        ]
      },
      {
        name: 's2', 
        series: [
          
          {name: '1', value: 29},
          {name: '2', value: 1},
          {name: '3', value: 34},
          {name: '4', value: 20},
          {name: '5', value: 25},
          {name: '6', value: 21},
          {name: '7', value: 56},
          {name: '8', value: 1},
          {name: '9', value: 22},
        ]
      }
    ]

  }



  view: [number,number] = [700, 700];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Data';
  yAxisLabel: string = 'Value';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
