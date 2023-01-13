import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/i-product';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor(private productsService: SupabaseService){}

  productes: IProduct[] = [];
 
 ngOnInit(): void {
   this.productsService.getProducts().subscribe(
    (prods: IProduct[]) => this.productes = prods, // Success function
   );
 }


}
