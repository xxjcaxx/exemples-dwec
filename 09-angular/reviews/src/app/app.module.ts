import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { ReviewsListComponent } from './reviews/reviews-list/reviews-list.component';
import { ProductsListComponent } from './reviews/products-list/products-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsItemComponent } from './reviews/products-item/products-item.component';
import { StarsRatingComponent } from './reviews/stars-rating/stars-rating.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductFilterPipe } from './pipes/product-filter.pipe';
import { ReviewFormComponent } from './reviews/review-form/review-form.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ProvesComponent } from './components/proves/proves.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ReviewsListComponent,
    ProductsListComponent,
    ProductsItemComponent,
    StarsRatingComponent,
    ProductFilterPipe,
    ReviewFormComponent,
    ProvesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
    }],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
