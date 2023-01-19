import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/i-product';
import { SharedService } from 'src/app/services/shared.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor(
    private productsService: SupabaseService,
    private sharedService: SharedService
    ){}

  productes: IProduct[] = [];
  filtre: string = '';
 
 ngOnInit(): void {
   this.productsService.productsSubject.subscribe(
    (prods: IProduct[]) => this.productes = prods, // Success function
   );
   this.productsService.getProducts();
   
   this.sharedService.filtre.subscribe(
    (f: string) => this.filtre = f
   )

 }


}
