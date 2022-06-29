import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hashtag'
})
export class HashtagPipe implements PipeTransform {

  transform(value: string[] | undefined): string {

    if (value) return value.map(s=> `#${s}`).join(', ');
    return '';
  }

}
