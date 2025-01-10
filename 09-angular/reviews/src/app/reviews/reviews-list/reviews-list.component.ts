import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/i-product';
import { IReview } from 'src/app/interfaces/i-review';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css']
})
export class ReviewsListComponent implements OnInit{

  constructor(private productsService: SupabaseService){}

  @Input() product!: IProduct;
  reviews: IReview[] = [];

  gethelpfull(review:IReview): number[]{
    return JSON.parse(review.helpful);
  }

  ngOnInit(): void {
    this.productsService.getReviews(this.product.asin).subscribe(
     (rev: IReview[]) => this.reviews = rev, // Success function
    );
  }

  updateReview($event: number, r: IReview){
    r.overall = $event;
    this.productsService.updateReview(r).subscribe(
      (status: boolean) => console.log("Review modificada")
      
    )
  }

}
