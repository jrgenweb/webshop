import { Component } from '@angular/core';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  constructor(public authService: Auth) {}
}
