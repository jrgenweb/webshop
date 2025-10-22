import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fallbackImage',
})
export class FallbackImagePipe implements PipeTransform {
  transform(
    url: string,
    fallback: string = 'https://placehold.co/600x400'
  ): string {
    // Ha nincs URL, vagy üres, fallback
    if (!url) return fallback;

    // Egyszerű regex ellenőrzés (opcionális)
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(url)) return fallback;

    // Ha minden ok, a kapott URL
    return url;
  }
}
