import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IProduct } from '../interfaces/i-product';
import { IReview } from '../interfaces/i-review';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  supaURL = 'https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/';
  productURL = `${this.supaURL}products?select=*`;
  headers = {'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM',
  'Range': '0-9'};
  //reviewURL = `${this.supaURL}reviews?asin=eq.1&select=*`;

  productsSubject: Subject<IProduct[]>;

  constructor(private http: HttpClient) {
    this.productsSubject = new Subject();
   }

  getProducts(): void{
   // return this.http.get<IProduct[]>(this.productURL,{headers: this.headers});
   this.http.get<IProduct[]>(this.productURL,{headers: this.headers})
     .subscribe(prods => this.productsSubject.next(prods))
  }

  searchProducts(filtre:string): void{
    this.http.get<IProduct[]>(`${this.supaURL}products?asin=like.%25${filtre}%25&select=*`,{headers: this.headers})
     .subscribe(prods => this.productsSubject.next(prods))
  }

  getProductById(id:number): void{
    let headersAux:any = {...this.headers};
    delete headersAux.Range
    this.http.get<IProduct[]>(`${this.supaURL}products?id=eq.${id}&select=*`,{headers: this.headers})
    .subscribe(prods => this.productsSubject.next(prods))

  }

  getReviews(asin:string): Observable<IReview[]>{
    let headersReviews = {...this.headers};
    headersReviews.Range = '0-1000';
    return this.http.get<IReview[]>(`${this.supaURL}reviews?asin=eq.${asin}&select=*`,{headers: headersReviews})
  }

  updateReview(review:IReview): Observable<boolean>{
    let headersReviews:any = {...this.headers};
    delete headersReviews.Range;
    headersReviews["Content-Type"] = "application/json";
    headersReviews["Prefer"] = "return=minimal";
    headersReviews["Content-Type"] = "application/json";
    return this.http.patch<IReview>(
      `${this.supaURL}reviews?id=eq.${review.id}`,
      JSON.stringify(review),
      {headers:  headersReviews}
      ).pipe(
        map(r=> true)
      )
  }
 
}
