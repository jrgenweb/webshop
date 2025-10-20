import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Product {
  constructor(private http: HttpClient) {}
  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      'https://api.escuelajs.co/api/v1/products'
    );
  }
}
