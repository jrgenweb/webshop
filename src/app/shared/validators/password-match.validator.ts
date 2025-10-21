import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(
  passwordKey = 'password',
  confirmKey = 'confirmPassword'
) {
  return (group: AbstractControl): ValidationErrors | null => {
    const formGroup = group as FormGroup;
    const pwd = formGroup.controls[passwordKey];
    const cpwd = formGroup.controls[confirmKey];
    if (!pwd || !cpwd) return null;

    // ha egyik mező még üres, ne jelentsünk mismatch-et itt (kivéve ha explicit akarod)
    if (cpwd.pristine) return null;

    const mismatch = pwd.value !== cpwd.value;
    return mismatch ? { passwordMismatch: true } : null;
  };
}
