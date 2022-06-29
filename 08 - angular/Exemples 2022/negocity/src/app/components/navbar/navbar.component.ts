import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Player } from 'src/app/interfaces/user';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private login: LoginService,
    private router: Router,
    private playersService: PlayersService
  ) {}
  isAuth: boolean = false;
  player?: Player;

  ngOnInit(): void {
    this.isAuth = this.login.isLogged() ? true : false;
    this.login.logged.subscribe((l) => {
      this.isAuth = l;
      if (this.isAuth) {
        this.playersService
          .getPlayer(localStorage.getItem('localId')!)
          .subscribe({
            next: (p) => (this.player = p),
            error: (e) => {
              console.log(e);
            },
          });
      }
    });
  }

  logout() {
    this.login.logout();
    this.player = undefined;
    this.router.navigate(['/home']);
  }
}
