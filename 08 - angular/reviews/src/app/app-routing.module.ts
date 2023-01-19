import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './reviews/products-list/products-list.component';
import { ReviewFormComponent } from './reviews/review-form/review-form.component';

const routes: Routes = [
  {path: 'home', component: ProductsListComponent},
  {path: 'createreview', component: ReviewFormComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
