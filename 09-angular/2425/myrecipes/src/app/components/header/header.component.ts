import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  logged: boolean = false;

  constructor(private supaService: SupabaseService){}


  ngOnInit(): void {
    this.logged =  this.supaService.loggedSubject.getValue();
    this.supaService.loggedSubject.subscribe(logged => this.logged = logged);
    this.supaService.isLogged();
  }
  
}
