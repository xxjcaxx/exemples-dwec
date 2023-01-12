import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/interfaces/i-product';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent {

  @Input() producte!: IProduct; 

}
