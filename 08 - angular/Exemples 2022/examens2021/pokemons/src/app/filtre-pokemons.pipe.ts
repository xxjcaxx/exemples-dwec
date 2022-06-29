import { Pipe, PipeTransform } from '@angular/core';
import { Pokemons } from './interfaces/pokemons';

@Pipe({
  name: 'filtrePokemons'
})
export class FiltrePokemonsPipe implements PipeTransform {

  transform(pokemonList: Pokemons[], filtreTipus: string | null, filtreNom: string): Pokemons[] {
    console.log(filtreTipus,filtreNom);

    if(filtreTipus != null){
      pokemonList = pokemonList.filter(p=> p.type.includes(filtreTipus))
    }
    if(filtreNom != ''){
      pokemonList = pokemonList.filter(p=> p.name.english.includes(filtreNom))
    }
    return pokemonList;
  }

}
