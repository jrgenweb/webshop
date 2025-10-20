import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  userForm!: FormGroup;
  constructor() {
    this.userForm = new FormGroup(
      {
        lastname: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          this.passwordPatternValidator(),
        ]),
        password2: new FormControl('', [
          Validators.required,
          this.passwordPatternValidator(),
        ]),
        avatar: new FormControl('', []),
      },
      { validators: this.passwordMatchValidator('password', 'password2') }
    );
  }

  onSubmit() {
    this.userForm.markAllAsTouched();
    console.log(this.userForm);
  }

  //equalValidation(control: FormControl): ValidationErrors {}

  /*
  checkEmailAvailablity():AsyncValidatorFn{
    return (control:AbstractControl):ValidationErrors | null =>{
      const value = control.value;



    }
  }*/
  passwordPatternValidator(): ValidatorFn {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-z\d@$!%*?&\-_]{8,16}$/;
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value == null || value === '') return null; // üres mezőt ne dobjon pattern hibára itt (use required külön)
      return regex.test(value) ? null : { passwordPattern: true };
    };
  }

  passwordMatchValidator(
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
}
