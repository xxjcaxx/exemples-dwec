import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { Pokemons } from '../../interfaces/pokemons';

@Component({
  selector: 'app-lista-pokemons',
  templateUrl: './lista-pokemons.component.html',
  styleUrls: ['./lista-pokemons.component.css']
})
export class ListaPokemonsComponent implements OnInit {

  constructor(
    private servicePokemons: PokemonsService
  ) { }

  pokemons: Pokemons[] = [];
  tipus: string[] = [];
  filtreTipus:string | null = null;
  filtreNom: string = '';

  ngOnInit(): void {
    this.servicePokemons.getPokemons().subscribe(p=>{
      console.log(p);
      this.pokemons = p;
    })
    this.servicePokemons.tipus.subscribe(t => this.tipus = t);
  }

  filter(type:string){
    this.filtreTipus = type;
  }

}
