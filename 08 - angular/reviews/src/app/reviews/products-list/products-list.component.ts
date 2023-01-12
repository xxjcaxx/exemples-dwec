import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/i-product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {
  productes: IProduct[] = [{"id":456,"created_at":"2022-12-19T14:54:24.43105+00:00","asin":"B00008RW9U"}, 
{"id":457,"created_at":"2022-12-19T14:54:24.43105+00:00","asin":"B0000AXRH5"}, 
{"id":458,"created_at":"2022-12-19T14:54:24.43105+00:00","asin":"B00002243X"}, 
{"id":459,"created_at":"2022-12-19T14:54:24.43105+00:00","asin":"B0000AXTUY"}, 
{"id":460,"created_at":"2022-12-19T14:54:24.43105+00:00","asin":"B0000AXY62"}, 
{"id":461,"created_at":"2022-12-19T14:54:24.43105+00:00","asin":"B0001L0DFA"}, 
{"id":462,"created_at":"2022-12-19T14:54:24.43105+00:00","asin":"B00008BKX5"}, 
{"id":463,"created_at":"2022-12-19T14:54:24.43105+00:00","asin":"B00002243Z"}, 
{"id":464,"created_at":"2022-12-19T14:54:24.43105+00:00","asin":"B0000AY3X0"}, 
{"id":465,"created_at":"2022-12-19T14:54:24.43105+00:00","asin":"B00020CB2S"}];
 
}
