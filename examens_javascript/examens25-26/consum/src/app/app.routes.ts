import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';

export const routes: Routes = [
  { path: 'productes', component: ProductList },
  { path: 'productes/:search/:order', component: ProductList },
  { path: '**', pathMatch: 'full', redirectTo: 'productes//' }
];
