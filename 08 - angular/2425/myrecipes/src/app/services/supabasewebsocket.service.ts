import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabasewebsocketService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }


  getChannel(){
    const currentUser = Math.random()+"";

    const channel = this.supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'shared_recipes_events',
        filter: 'shared_recipe=eq.1',
      },
      (payload:any) => console.log(payload)
    )
    .subscribe();

  }
  

}
