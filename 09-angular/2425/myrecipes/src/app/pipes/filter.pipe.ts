import { Pipe, PipeTransform } from '@angular/core';
import { IRecipe } from '../recipes/i-recipe';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(recipes: IRecipe[], filterBy: string): IRecipe[] { // el primer argument és el que cal filtrar i després una llista d'arguments
    // en aquest cas sols és un, el criteri de búsqueda
      const filter = filterBy ? filterBy.toLocaleLowerCase() : null; // passem el filtre a minúscules o a null si no està
      return filter ?  // Si no és null filtra
      recipes.filter(r => `${r.strMeal} ${r.strInstructions}`.toLowerCase().includes(filter))
      : recipes; // si és null trau l'array sense filtre
    }

}
