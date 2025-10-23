import { Injectable, signal } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { Product } from './product';
import { Category } from './category';
import { User } from './user';
import { ICategory, IUser } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  summary = signal({
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    avgPriceByCategory: [] as { name: string; avg: number }[],
    productCountByCategory: [] as { name: string; count: number }[],
  });

  constructor(
    private productService: Product,
    private categoryService: Category,
    private userService: User
  ) {}

  /** 🔄 Lekéri az összes szükséges adatot és frissíti a summary-t */
  loadSummary() {
    combineLatest([
      this.productService.getAll(),
      this.categoryService.getAll(),
      this.userService.getAll(),
    ])
      .pipe(
        map(([products, categories, users]) => {
          // 🔹 Termékszám kategóriánként
          const productCountByCategory = (categories as Array<ICategory>).map(
            (c: any) => ({
              name: c.name,
              count: products.filter((p: any) => p.category.id === c.id).length,
            })
          );

          // 🔹 Átlagár kategóriánként
          const avgPriceByCategory = (categories as Array<ICategory>).map(
            (c: any) => {
              const prods = products.filter((p: any) => p.category.id === c.id);
              const avg =
                prods.reduce((sum: number, p: any) => sum + p.price, 0) /
                (prods.length || 1);
              return { name: c.name, avg };
            }
          );
          return {
            totalProducts: products.length,
            totalCategories: (categories as Array<ICategory>).length,
            totalUsers: (users as Array<IUser>).length,
            avgPriceByCategory,
            productCountByCategory,
          };
        })
      )
      .subscribe((summary) => this.summary.set(summary));
  }
}
