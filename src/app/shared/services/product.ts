import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private _selectedCategoryId?: number;
  private _searchString?: string;
  private _minPrice!: number;
  private _maxPrice?: number;

  private products!: IProduct[];

  $filteredProducts = new BehaviorSubject<IProduct[]>([]);

  constructor(private http: HttpClient) {
    this.getAll().subscribe({
      next: (response) => {
        this.products = response;
      },
    });
  }

  getAll(): Observable<IProduct[]> {
    const products = sessionStorage.getItem('products');
    if (products) return of(JSON.parse(products)) as Observable<IProduct[]>;
    return this.http
      .get<IProduct[]>('https://api.escuelajs.co/api/v1/products')
      .pipe(
        map((products) => {
          products = products.map((p) => {
            p.price = this.getHuf(p.price);
            return p;
          });
          sessionStorage.setItem('products', JSON.stringify(products));
          this.products = products;
          this.$filteredProducts.next(this.products);
          return products;
        })
      );
  }

  applyFilter(): void {
    if (!this.searchString && !this.selectedCategoryId) {
      this.$filteredProducts.next(this.products);
    } else {
      let filteredProducts = this.products.filter((p) => {
        const matchesMinPrice = !this.minPrice || p.price >= this.minPrice;
        const matchesMaxPrice = !this.maxPrice || p.price <= this.maxPrice;
        const matchesCategory =
          !this.selectedCategoryId || p.category.id === this.selectedCategoryId;
        const matchesSearch =
          !this.searchString ||
          p.title.toLowerCase().includes(this.searchString.toLowerCase());

        return (
          matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice
        );
      });
      this.$filteredProducts.next(filteredProducts);
    }
  }

  get minPrice(): number | undefined {
    return this._minPrice;
  }
  set minPrice(value: number) {
    this._minPrice = value;
    this.applyFilter();
  }
  get maxPrice(): number | undefined {
    return this._maxPrice;
  }
  set maxPrice(value: number) {
    this._maxPrice = value;
    console.log('from servicess');
    console.log(this.$filteredProducts.value);
    this.applyFilter();
  }

  get selectedCategoryId(): number | undefined {
    return this._selectedCategoryId;
  }
  set selectedCategoryId(value: number) {
    this._selectedCategoryId = value;
    this.applyFilter();
  }
  get searchString(): string | undefined {
    return this._searchString;
  }
  set searchString(value: string) {
    this._searchString = value;
    this.applyFilter();
  }

  private getHuf(price: number): number {
    return Number(price) * 360;
  }
}
