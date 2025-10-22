import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ICategory } from '../interfaces/IProduct';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Category {
  private _serchString: string = '';
  private categories!: ICategory[];
  filteredCategories = signal<ICategory[]>([]);

  constructor(private http: HttpClient) {
    this.refresh();
  }

  get searchString(): string {
    return this._serchString;
  }
  set searchString(value: string) {
    this._serchString = value;
    this.applyFilter();
  }
  private refresh() {
    this.getAll().subscribe();
  }
  getAll() {
    return this.http.get('https://api.escuelajs.co/api/v1/categories').pipe(
      tap((resp) => {
        this.categories = resp as ICategory[];
        this.applyFilter();
      })
    );
  }

  add(category: ICategory) {
    const body = category;
    return this.http
      .post('https://api.escuelajs.co/api/v1/categories/', body)
      .pipe(
        tap(() => {
          this.refresh();
        })
      );
  }
  delete(categoryId: number) {
    return this.http
      .delete('https://api.escuelajs.co/api/v1/categories/' + categoryId)
      .pipe(
        tap(() => {
          this.refresh();
        })
      );
  }

  update(category: ICategory) {
    const { id, ...body } = category;
    return this.http
      .put('https://api.escuelajs.co/api/v1/categories/' + category.id, body)
      .pipe(
        tap(() => {
          this.refresh();
        })
      );
  }

  applyFilter() {
    const filtered = this.searchString
      ? this.categories.filter((c) =>
          c.name.toLowerCase().includes(this.searchString.toLowerCase())
        )
      : this.categories;

    this.filteredCategories.set(filtered);
  }
}
