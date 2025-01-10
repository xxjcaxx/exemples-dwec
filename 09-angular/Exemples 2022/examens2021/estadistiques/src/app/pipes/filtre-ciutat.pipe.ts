import { Pipe, PipeTransform } from '@angular/core';
import { ILinea } from '../interfaces/i-linea';

@Pipe({
  name: 'filtreCiutat'
})
export class FiltreCiutatPipe implements PipeTransform {

  transform(linies: ILinea[], ciutat: string): ILinea[] {
    if (ciutat)
    return linies.filter(l=> l.ciudad == ciutat);
    else
    return linies;
  }

}
