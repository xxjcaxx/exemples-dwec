import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  BehaviorSubject,
  forkJoin,
  from,
  interval,
  map,
  mergeMap,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { IRecipe } from '../recipes/i-recipe';
import { Ingredient } from '../recipes/ingredient';
import { ISharedRecipe } from '../recipes/i-shared-recipe';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private http: HttpClient) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  getDataObservable<T>(
    table: string,
    search?: Object,
    ids?: string[],
    idField?: string
  ): Observable<T[]> {
    return from(this.getData(table, search, ids, idField));
  }

  async getData(
    table: string,
    search?: Object,
    ids?: string[],
    idField?: string
  ): Promise<any[]> {
    let query = this.supabase.from(table).select('*');
    if (search) {
      query = query?.match(search);
    }
    if (ids) {
      console.log(idField);

      query = query?.in(idField ? idField : 'id', ids);
    }
    const { data, error } = await query;
    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    return data;
  }

  getMeals(search?: string): Observable<IRecipe[]> {
    return this.getDataObservable(
      'meals',
      search ? { idMeal: search } : undefined
    );
  }

  getIngredients(ids: (string | null)[]): Observable<Ingredient> {
    return this.getDataObservable<Ingredient>(
      'ingredients',
      undefined,
      ids.filter((id) => id !== null) as string[],
      'idIngredient'
    ).pipe(
      mergeMap((ingredients: Ingredient[]) => from(ingredients)),
      mergeMap(async (ingredient: Ingredient) => {
        const { data, error } = await this.supabase.storage
          .from('recipes')
          .download(`${ingredient.strStorageimg}`);
        if (data) {
          ingredient.blobimg = URL.createObjectURL(data);
        }
        return ingredient;
      })
    );
  }

 login(email: string, password: string) {
   const loginResult = from(this.supabase.auth.signInWithPassword({
    email,
    password
  })).pipe(
    map(({ data, error }) => {
        if (error) {
          throw error;
        }
        return data;
      }),
    tap(()=>this.isLogged())
  );

  return loginResult;

  }


  getSharedRecipes(search?: string): Observable<ISharedRecipe[]> {
    return from(this.supabase.from('shared_recipes').select('*, meals(*),shared_recipes_events(*)')).pipe(
      map(({ data }) => data as ISharedRecipe[])
    );
  }

  /////// TODO Register, logout

  static loggedSubject = new BehaviorSubject(false);

  async isLogged(){
      const { data: { user } } = await this.supabase.auth.getUser()
      if(user){
        SupabaseService.loggedSubject.next(true);
      }
      else
      SupabaseService.loggedSubject.next(false);
  }


  getCharacters(): Observable<any[]> {
    return this.http
      .get<{ results: any[] }>(
        'https://rickandmortyapi.com/api/character/?page=19'
      )
      .pipe(map((data: { results: any[] }) => data.results));
  }

  getInterval(): Observable<number> {
    return interval(1000);
  }
}
