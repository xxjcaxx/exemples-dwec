import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/i-product';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';


@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit{

  constructor( private activatedRoute: ActivatedRoute, 
    private productsService: SupabaseService,) { }

  @Input() producte?: IProduct; 

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => { 
      if(params['id']){

        this.productsService.productsSubject.subscribe(
          products => this.producte = products[0]
        );

        this.productsService.getProductById(params['id']);

      }
      
    })
  }
 
 

}
