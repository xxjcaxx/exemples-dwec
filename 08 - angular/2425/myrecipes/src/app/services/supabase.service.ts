import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, interval, map, Observable, take } from 'rxjs';
import { environment } from '../../environments/environment';
import { IRecipe } from '../recipes/i-recipe';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor(private http: HttpClient) { 
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  getDataObservable(table: string): Observable<any[] | IRecipe[]> {
    return from(this.getData(table));
  }

  async getData(table: string): Promise<any[]> {
    const { data, error } = await this.supabase.from(table).select('*');
    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    return data;
  }


  getMeals(): Observable<IRecipe[]>{
    return this.getDataObservable('meals');
  }


  getRecipes(){
    return 'hola'
  }

  getCharacters(): Observable<any[]>{
        return this.http.get<{results: any[]}>('https://rickandmortyapi.com/api/character/?page=19')
        .pipe(
          map((data: {results: any[]}) => data.results)
        )
  }

  getInterval(): Observable<number>{
    return interval(1000)
  }
}
