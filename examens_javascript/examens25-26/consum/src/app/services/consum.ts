import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Consum {


  http: HttpClient = inject(HttpClient);

  products = new BehaviorSubject<Product[]>([]);
  filteredProducts = new BehaviorSubject<Product[]>([]);
  carret = new BehaviorSubject<Product[]>([]);


  getProducts(){
    this.http.get<{products: any[]}>('/consum-api/api/rest/V1.0/catalog/product?page=1&limit=20&offset=0&orderById=5&showProducts=true&originProduct=undefined&showRecommendations=false&categories=1959').pipe(
      map(p => p.products),
      tap(p => console.log(p)),
      map(p => p.map((P):Product => ({
        name: P.productData.name,
        id: P.id,
        imageURL: P.media[0].url,
        price: P.priceData.prices[0].value.centAmount
      })))
    ).subscribe(p => {
      this.products.next(p);
      this.filteredProducts.next(p);
    });

  }


  filterProducts(query: string, order: string){
    let filtered = this.products.value.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    if (order === 'asc'){
      filtered.sort((a,b) => a.price > b.price ? 1 : -1)
    }
    if (order === 'desc'){
      filtered.sort((a,b) => a.price < b.price ? 1 : -1)
    }

    this.filteredProducts.next(filtered);
  }


  afegirAlCarret(product: Product){
    const carretActual = this.carret.value;
    this.carret.next([...carretActual, product]);
  }

}
