import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unit',
})
export class UnitPipe implements PipeTransform {
  transform(value: number, unit: string = '', ...args: number[]): string {
    if (value === 0) return '';
    return value.toString() + ' ' + unit;
  }
}
