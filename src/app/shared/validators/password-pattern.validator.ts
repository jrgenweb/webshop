import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordPatternValidator(): ValidatorFn {
  const regex = /^[a-zA-Z0-9]{4,}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value == null || value === '') return null; // üres mezőt ne dobjon pattern hibára itt (use required külön)
    return regex.test(value) ? null : { passwordPattern: true };
  };
}
