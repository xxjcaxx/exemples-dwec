import { Component, input, output } from '@angular/core';
import { Product } from '../interfaces/product';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-item',
  imports: [JsonPipe],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css'
})
export class ProductItem {

  product = input.required<Product>();

  toggleFav(){
    this.fav = !this.fav;
    this.favToggled.emit();
  }

  favToggled = output<void>();

  fav: boolean = false;
}
