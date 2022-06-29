import { Pipe, PipeTransform } from '@angular/core';
import { IEdifici } from '../interfaces/i-edifici';

@Pipe({
  name: 'filtreEdificis'
})
export class FiltreEdificisPipe implements PipeTransform {

  transform(edificis: IEdifici[], criteri: string): IEdifici[] {

    const crit =  criteri ? criteri.toLowerCase(): null;

    let edificisFiltrats = crit ? edificis.filter(e=> e.properties.descripcio.toLowerCase().includes(crit)) : edificis;

    return edificisFiltrats;
  }

}
