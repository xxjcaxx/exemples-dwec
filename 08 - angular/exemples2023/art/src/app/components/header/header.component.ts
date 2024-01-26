import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private filterService: FilterService, private usersService :UsersService){}

  ngOnInit(): void {
      this.usersService.userSubject.subscribe(user => this.user = user);
      this.usersService.isLogged();
  }

  user: IUser | null = null;
  defaultImage: string = 'assets/logo.svg'

  filter: string='';

  changeFilter($event: Event){
      $event.preventDefault();
      this.filterService.searchFilter.next(this.filter)
  }



}
