import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.productURL,{headers: this.headers});
  }

  getReviews(asin:string): Observable<IReview[]>{
    let headersReviews = {...this.headers};
    headersReviews.Range = '0-1000';
    return this.http.get<IReview[]>(`${this.supaURL}reviews?asin=eq.${asin}&select=*`,{headers: headersReviews})

  }
 
}
