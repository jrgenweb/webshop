import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../auth/auth';

@Component({
  selector: 'app-signin',
  imports: [RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.scss',
})
export class Signin {
  constructor(private authService: Auth) {}

  login() {
    this.authService.login();
  }
}
