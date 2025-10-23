import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get('https://api.escuelajs.co/api/v1/users');
  }

  add(user: IUser) {
    const body = user;
    return this.http.post('https://api.escuelajs.co/api/v1/users/', body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
