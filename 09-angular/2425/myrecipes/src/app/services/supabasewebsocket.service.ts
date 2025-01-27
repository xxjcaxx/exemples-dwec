import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabasewebsocketService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }


  getsharedRecipesChannel(recipe: number){
    const sharedRecipesSubject: Subject<any> = new Subject<any>();


    const channel = this.supabase
    .channel('shared_recipes_events_change')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'shared_recipes_events',
        filter: `shared_recipe=eq.${recipe}`,
      },
      (payload:any) => sharedRecipesSubject.next(payload)
    )
    .subscribe();

    return sharedRecipesSubject
  }


}
