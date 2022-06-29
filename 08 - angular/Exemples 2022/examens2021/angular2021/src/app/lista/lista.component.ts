import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../heroe.service';
import { IHeroe } from '../i-heroe';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(
    private hService: HeroeService
  ) { }

  heroes: IHeroe[] = [];

  ngOnInit(): void {

    this.hService.getHeroes().subscribe(h=> {this.heroes = h; console.log(this.heroes);
    });
  }

}
