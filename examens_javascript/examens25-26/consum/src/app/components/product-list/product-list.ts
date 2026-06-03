import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductItem } from '../product-item/product-item';
import { Consum } from '../../services/consum';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list',
  imports: [ProductItem],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit{

  consumService: Consum = inject(Consum);

  search = input<string>('');
  order = input<string>('');

  products = toSignal(this.consumService.filteredProducts, {initialValue: []});

  ngOnInit(): void {
    this.consumService.getProducts();
  }

  constructor() {
    effect(() => {
      this.consumService.filterProducts(this.search(),this.order());
    });
  }





}
