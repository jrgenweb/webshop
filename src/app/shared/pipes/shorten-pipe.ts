import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, len: number, ...args: string[]): string {
    if (!value) return '';
    return value.substring(0, len) + '...';
  }
}
