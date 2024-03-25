import {Pipe, PipeTransform} from '@angular/core';

@Pipe({standalone: true, name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      const splitValues = value.split(' ');
      const splitValuesDash = value.split('-');
      const hasDash = value.split('-').length > 1;
      return (hasDash ? splitValuesDash : splitValues).map(item =>
        item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
      ).join(hasDash ? '-' : ' ')
    } else {
      return '';
    }
  }
}
