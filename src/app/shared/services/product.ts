import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { BehaviorSubject, map, Observable, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private _selectedCategoryId?: number = 0;
  private _searchString?: string;
  private _minPrice!: number;
  private _maxPrice?: number;
  private products!: IProduct[];

  isLoading = signal<boolean>(false);

  $filteredProducts = new BehaviorSubject<IProduct[]>([]);

  constructor(private http: HttpClient) {
    this.getAll().subscribe({
      next: (response) => {
        this.products = response;
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
      },
    });
  }

  public getAll(): Observable<IProduct[]> {
    this.isLoading.set(true);
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

  getBySlug(slug: string): IProduct {
    return this.products.find((p) => p.slug === slug) as IProduct;
  }

  applyFilter(): void {
    if (
      !this.searchString &&
      !this.selectedCategoryId &&
      !this.minPrice &&
      !this.maxPrice
    ) {
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
  clearFilter(): void {
    this.searchString = '';
    this.maxPrice = 0;
    this.minPrice = 0;
    this.selectedCategoryId = 0;
  }

  add(product: IProduct) {
    const body = product;
    return this.http
      .post('https://api.escuelajs.co/api/v1/products/', body)
      .pipe(
        tap(() => {
          this.getAll().subscribe(() => this.applyFilter());
        })
      );
  }
  update(product: IProduct) {
    const { id, ...body } = product;

    return this.http
      .put('https://api.escuelajs.co/api/v1/products/' + product.id, body)
      .pipe(
        tap(() => {
          this.getAll().subscribe(() => this.applyFilter()); //this.applyFilter();
        })
      );
  }
  delete(product: IProduct) {
    return this.http
      .delete('https://api.escuelajs.co/api/v1/products/' + product.id)
      .pipe(
        tap(() => {
          this.getAll().subscribe(() => {
            this.applyFilter();
          });
        })
      );
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
