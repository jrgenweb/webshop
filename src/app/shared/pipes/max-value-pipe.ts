import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'maxValue', standalone: true })
export class MaxValuePipe implements PipeTransform {
  transform(arr: any[], key: string): number {
    return Math.max(...arr.map((a) => a[key] || 0));
  }
}
