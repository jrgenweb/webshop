import { computed, Injectable, signal } from '@angular/core';
import { IUser } from '../shared/interfaces/IProduct';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../shared/services/toast';

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
  ) {}
  login() {
    localStorage.setItem('token', 'fake-jwt');
    this._isLoggedIn.set(true);
    this.toastService.show('Sikeres bejelentkezés', 'bg-success', 3000);
    this.router.navigate(['/webshop']);
  }

  logout() {
    localStorage.removeItem('token');
    this._isLoggedIn.set(false);
  }

  register(user: IUser) {
    const body = user;
    console.log(body);
    return this.http.post('https://api.escuelajs.co/api/v1/users/', body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
