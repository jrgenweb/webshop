import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from './auth';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      // ha bejelentkezett, visszadobjuk a főoldalra
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
