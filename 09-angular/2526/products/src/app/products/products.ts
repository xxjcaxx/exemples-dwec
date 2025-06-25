import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductItem } from "../product-item/product-item";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [ProductItem, JsonPipe],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {

  productList: Product[] = [
    {id: 1, name: "p1", price: 25.4},
    {id: 2, name: "p2", price: 2.4},
    {id: 3, name: "p3", price: 5.4},
    {id: 4, name: "p4", price: 254},
    {id: 5, name: "p5", price: 123},
    {id: 6, name: "p6", price: 0.34},
  ]; 

  favs = new Map(this.productList.map(p=> [p,false]));

  toggleFav(p:Product){
    this.favs.set(p,!Boolean(this.favs.get(p)));  
  }


}
