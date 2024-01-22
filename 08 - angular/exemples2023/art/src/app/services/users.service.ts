import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { Observable, Subject, from, tap } from 'rxjs';
import { IUser } from '../interfaces/user';
import { environment } from '../../environments/environment';


const emptyUser: IUser = {id: '0', avatar_url: 'none', full_name: 'none', username: 'none' }

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  supaClient: any = null;

  constructor() {
    this.supaClient = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);
  }

  userSubject: Subject<IUser> = new Subject;

  async login(email: string, password: string):Promise<boolean>{
        let session = await this.supaClient.auth.getSession();
        let data, error;

        if(session.session.data){
          data = session.session.data;
        }
        else{
          session = await this.supaClient.auth.signInWithPassword({
            email,
            password
          });
          data = session.data;
          error = session.error;
          if(error){
            throw error;
          }
        }

        if(data.user != null){
          this.getProfile(data.user.id);
          return true;
        }
      return false;
  }

  getProfile(userId:string): void{

    let profilePromise: Promise<{data: IUser[]}> = this.supaClient
    .from('profiles')
    .select("*")
    // Filters
    .eq('id', userId);

    from(profilePromise).pipe(
      tap(data => console.log(data))
      ).subscribe(async (profile:{data: IUser[]}) =>{
        this.userSubject.next(profile.data[0]);
        const avatarFile = profile.data[0].avatar_url.split('/').at(-1);
        const { data, error } = await this.supaClient.storage.from('avatars').download(avatarFile);
        const url = URL.createObjectURL(data)
        profile.data[0].avatar_url = url;
        this.userSubject.next(profile.data[0]);
      }

      );

  }

  async isLogged(){
    let {data,error} = await this.supaClient.auth.getSession();
    if(data.session){


      this.getProfile(data.session.user.id)
    }
  }

  async logout(){
    const { error } = await this.supaClient.auth.signOut();
    this.userSubject.next(emptyUser);
  }


}




/*
npm install @supabase/supabase-js

*/
