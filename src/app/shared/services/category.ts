import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Category {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get('https://api.escuelajs.co/api/v1/categories');
  }
}
