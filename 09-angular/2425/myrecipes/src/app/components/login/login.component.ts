import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private supaService: SupabaseService){}

  email: string = '';
  password: string = '';
  error: string | undefined;


  sendLogin(){
    this.supaService.login(this.email,this.password).subscribe(loginData => {
      if(loginData.error){
        this.error = loginData.error.message;
      }
    })
  }


  

}
