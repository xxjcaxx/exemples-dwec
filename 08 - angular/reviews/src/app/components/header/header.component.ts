import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  filtre: string = '';

  constructor(private sharedService: SharedService,
    private supabaseService: SupabaseService
    ){
  }

  ngOnInit(): void {
    this.sharedService.filtre.subscribe(
      (f: string) => this.filtre = f
    )
  }

  aplicarFiltre(){
    //this.sharedService.filtre.next(this.filtre);
    this.supabaseService.searchProducts(this.filtre);
  }

}
