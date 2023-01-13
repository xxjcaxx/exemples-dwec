import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { ReviewsListComponent } from './reviews/reviews-list/reviews-list.component';
import { ProductsListComponent } from './reviews/products-list/products-list.component';
import { FormsModule } from '@angular/forms';
import { ProductsItemComponent } from './reviews/products-item/products-item.component';
import { StarsRatingComponent } from './reviews/stars-rating/stars-rating.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ReviewsListComponent,
    ProductsListComponent,
    ProductsItemComponent,
    StarsRatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
