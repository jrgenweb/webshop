import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { of, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Szinkron rész: kiterjesztés ellenőrzése
function validImageExtension(url: string | null): boolean {
  if (!url) return false;
  const pattern = /\.(jpeg|jpg|gif|png|webp|svg)$/i;
  return pattern.test(url);
}

// Async rész: URL tényleges ellenőrzése
export function isValidImage(): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const url = control.value;

    if (!url) return of(null);

    // Szinkron ellenőrzés a kiterjesztésre
    if (!validImageExtension(url)) {
      return of({ invalidImageUrl: true });
    }

    // Async ellenőrzés: fetch HEAD kérés a kép létezésére
    return from(fetch(url, { method: 'HEAD' })).pipe(
      map((res) => {
        const contentType = res.headers.get('Content-Type') || '';
        return res.ok && contentType.startsWith('image')
          ? null
          : { invalidImageUrl: true };
      }),
      catchError(() => of({ invalidImageUrl: true }))
    );
  };
}
