import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-proves',
  templateUrl: './proves.component.html',
  styleUrls: ['./proves.component.css']
})
export class ProvesComponent implements OnInit {

  @Input() nom: string = '';

  ngOnInit(): void {
    console.log(this.nom);
    
  }

}
