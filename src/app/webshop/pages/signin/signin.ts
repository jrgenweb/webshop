import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../auth/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, FormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.scss',
})
export class Signin {
  email!: string;
  password!: string;
  constructor(private authService: Auth) {}

  login() {
    if (this.email && this.password)
      this.authService.login(this.email, this.password);
  }
}
