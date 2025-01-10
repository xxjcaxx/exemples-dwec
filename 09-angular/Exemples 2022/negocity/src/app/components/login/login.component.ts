import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginValid = false;
  public username = '';
  public password = '';

  constructor(
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

 public onSubmit(): void {
   let user:User = { email: this.username, password: this.password};
   this.loginService.login(user).subscribe({
     next: user=>{
       console.log(user);
       this.router.navigate(['/global']);
      },
     error: err=>{console.log(err)}
    });
 }
}
