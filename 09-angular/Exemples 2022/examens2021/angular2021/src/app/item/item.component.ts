import { Component, Input, OnInit } from '@angular/core';
import { IHeroe } from '../i-heroe';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() heroe?: IHeroe;

  constructor() { }

  ngOnInit(): void {
  }

}
