import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { forkJoin, from, interval, map, mergeMap, Observable, switchMap, take } from 'rxjs';
import { environment } from '../../environments/environment';
import { IRecipe } from '../recipes/i-recipe';
import { Ingredient } from '../recipes/ingredient';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor(private http: HttpClient) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  getDataObservable<T>(table: string, search?: Object, ids?: string[], idField?: string): Observable<T[]> {
    return from(this.getData(table, search, ids, idField));
  }

  async getData(table: string, search?: Object, ids?: string[], idField?: string): Promise<any[]> {
    let query = this.supabase.from(table).select('*');
    if (search) {
      query = query?.match(search);
    }
    if (ids) {
      console.log(idField);

      query = query?.in(idField ? idField : 'id', ids);
    }
    const { data, error } = await query
    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    return data;
  }


  getMeals(search?: string): Observable<IRecipe[]>{
    return this.getDataObservable('meals',search ? {idMeal: search}: undefined);
  }

  getIngredients(ids: (string | null)[]): Observable<Ingredient>{
    return this.getDataObservable<Ingredient>('ingredients', undefined, ids.filter(id => id !== null) as string[], 'idIngredient')
    .pipe(
      mergeMap(ingredients => from(ingredients)),
      mergeMap(async ingredient => {
            const { data, error } = await this.supabase
              .storage
              .from('recipes')
              .download(`${ingredient.strStorageimg}?rand=${Math.random()}`);
            if (data) {
              ingredient.blobimg = URL.createObjectURL(data);
            }
            return ingredient;
          })
        
      )
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
