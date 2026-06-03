import { Component, inject, input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Consum } from '../../services/consum';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem {

  consumService = inject(Consum);

  product = input.required<Product>()

  afegir(product: Product){
    console.log('Afegint al carret el producte: ', product);
    this.consumService.afegirAlCarret(product);
  }

}
