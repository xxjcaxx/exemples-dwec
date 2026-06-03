import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  router: Router = inject(Router);

  query = signal('');
  order = signal('');

  constructor(){
    effect(()=>{
       this.router.navigate(['/productes',  this.query(), this.order() ] );
    })
  }


}
