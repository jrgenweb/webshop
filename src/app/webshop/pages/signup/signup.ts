import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';
import { passwordPatternValidator } from '../../../shared/validators/password-pattern.validator';
import { isValidImage } from '../../../shared/validators/is-valid-image.validator';
import { IUser } from '../../../shared/interfaces/IProduct';
import { Auth } from '../../../auth/auth';
import { Toast } from '../../../toast/toast';
import { ToastService } from '../../../shared/services/toast';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, Toast],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  userForm!: FormGroup;
  constructor(
    private authService: Auth,
    public toastService: ToastService,
    private route: Router
  ) {
    this.userForm = new FormGroup(
      {
        lastname: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('1234', [
          Validators.required,
          passwordPatternValidator(),
        ]),
        password2: new FormControl('1234', [
          Validators.required,
          passwordPatternValidator(),
        ]),
        avatar: new FormControl(
          'https://mkt.cdnpk.net/web-app/media/freepik-20-2000.webp',
          [],
          [isValidImage()]
        ),
      },
      { validators: passwordMatchValidator('password', 'password2') }
    );
  }

  onSubmit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      let user: IUser = {
        name: formData.firstname + ' ' + formData.lastname,
        email: formData.email,
        password: formData.password,
        avatar: formData?.avatar,
      };

      this.authService.register(user).subscribe({
        next: (response) => {
          this.toastService.show('Sikeres regisztráció', 'bg-success', 3000);
          this.route.navigate(['/signin']);
        },
        error: (err) => {
          this.toastService.show('Sikertelen regisztráció', 'bg-danger', 3000);
          console.error(err);
        },
      });
    }
  }
}
