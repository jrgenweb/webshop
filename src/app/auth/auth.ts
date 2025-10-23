import { computed, Injectable, signal } from '@angular/core';
import { IUser } from '../shared/interfaces/IProduct';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../shared/services/toast';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private _isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));
  isLoggedIn = computed(() => this._isLoggedIn());
  user: IUser = {
    name: 'Laci',
    email: 'n@gm.com',
    avatar: 'https://mkt.cdnpk.net/web-app/media/freepik-20-2000.webp',
    password: '1234',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {
    const token = localStorage.getItem('token');
    this._isLoggedIn.set(!!token);
  }
  login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };
    this.http
      .post<{ access_token: string; refresh_token: string }>(
        'https://api.escuelajs.co/api/v1/auth/login',
        body,
        {
          headers: { 'Content-Type': 'application/json' },
          observe: 'response',
        }
      )
      .pipe(tap(() => {}))
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.body?.access_token ?? '');
          localStorage.setItem(
            'refresh_token',
            response.body?.refresh_token ?? ''
          );
          console.log(response.body?.access_token);
          this._isLoggedIn.set(true);
          this.toastService.show('Sikeres bejelentkezés', 'bg-success', 3000);
          this.router.navigate(['/webshop']);
        },
        error: (err) => {
          // Hibás login
          if (err.status === 401) {
            this.toastService.show('Hibás belépési adatok', 'bg-danger', 3000);
          } else {
            console.error('⚠️ Ismeretlen hiba', err);
          }
        },
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    this._isLoggedIn.set(false);
    this.toastService.show('Sikeres kijelentkezés', 'bg-primary', 3000);
    this.router.navigate(['/signin']);
  }

  register(user: IUser) {
    const body = user;
    return this.http.post('https://api.escuelajs.co/api/v1/users/', body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
