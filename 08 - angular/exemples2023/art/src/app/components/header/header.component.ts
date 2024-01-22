import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private filterService: FilterService){}

  filter: string='';

  changeFilter($event: Event){
      $event.preventDefault();
      this.filterService.searchFilter.next(this.filter)
      
  }

}
