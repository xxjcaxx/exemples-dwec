import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/i-product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: IProduct[], filterAsin: string): IProduct[] {

    const filterAsinUpper = filterAsin ? filterAsin.toLocaleUpperCase() : null;

    return filterAsinUpper ? 
          products.filter(p=> p.asin.includes(filterAsinUpper))   
          : products;
  }

}
