import { Injectable } from '@angular/core';
import { User } from './user';
import { IOrder, IProduct, IUser, TOrderStatus } from '../interfaces/IProduct';
import { BehaviorSubject, combineLatest, of } from 'rxjs';

import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class Order {
  private _minPrice: number = 0;
  private _maxPrice: number = 0;
  private _minDate: string = '';
  private _maxDate: string = '';
  private _searchString: string = '';
  private _status: '' | 'pending' | 'delivered' | 'shipped' = '';

  public orders: IOrder[] = [];

  $filteredOrders = new BehaviorSubject<IOrder[]>([]);

  constructor(private userService: User, private productService: Product) {
    this.generateOrders();
  }

  getAll() {
    return of(this.orders);
  }
  private generateOrders() {
    let orders = sessionStorage.getItem('orders');
    if (orders) {
      this.orders = JSON.parse(orders) as IOrder[];
      this.applyFilter();
      return;
    } else {
      combineLatest([
        this.userService.getAll(),
        this.productService.getAll(),
      ]).subscribe(([users, products]) => {
        this.createFakeOrders(users as IUser[], products as IProduct[]);
        sessionStorage.setItem('orders', JSON.stringify(this.orders));
        this.applyFilter();
        console.log('📦 Generált rendelések:', this.orders);
      });
    }
  }

  private generateRandomNumbers(count: number, min: number, max: number) {
    if (max < min) [max, min] = [min, max];
    if (max - min < count) return [];

    const numbers: number[] = [];
    while (numbers.length < count) {
      const num = Math.floor(Math.random() * (max - min)) + min;
      if (!numbers.includes(num)) numbers.push(num);
    }

    return numbers;
  }

  private createFakeOrders(users: IUser[], products: IProduct[]) {
    this.orders = [];

    // Véletlenszerűen kiválasztjuk a felhasználók kb. felét
    const selectedUserIndexes = this.generateRandomNumbers(
      Math.floor(users.length / 2),
      0,
      users.length
    );

    selectedUserIndexes.forEach((userIndex) => {
      const user = users[userIndex];

      // minden userhez 1–5 rendelés
      const orderCount = Math.floor(Math.random() * 5) + 1;

      for (let i = 0; i < orderCount; i++) {
        const productCount = Math.floor(Math.random() * 5) + 1;
        const productIndexes = this.generateRandomNumbers(
          productCount,
          0,
          products.length
        );

        const selectedProducts = productIndexes.map((idx) => products[idx]);

        const orderProducts = selectedProducts.map((p) => ({
          productId: p.id,
          productName: p.title,
          productImg: p.images?.[0] || 'no-image.jpg',
          slug: p.slug,
          amount: Math.floor(Math.random() * 5) + 1,
          price: p.price,
          priceWithTax: p.price * 1.27,
          categoryId: p.category?.id || 0,
        }));

        const total = orderProducts.reduce(
          (sum, p) => sum + p.priceWithTax * p.amount,
          0
        );

        let status: string = ['pending', 'shipped', 'delivered'][
          Math.floor(Math.random() * 3)
        ];

        const order: IOrder = {
          id: this.orders.length + 1,
          user: user,
          products: orderProducts,
          total,
          status: status as TOrderStatus,
          createdAt: new Date(
            Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30
          ).toISOString(),
        };

        this.orders.push(order);
      }
    });
  }

  applyFilter() {
    let filteredOrders = this.orders.filter((o) => {
      const matchMinPrice = !this.minPrice || o.total >= this.minPrice;
      const matchMaxPrice = !this.maxPrice || o.total <= this.maxPrice;
      const matchMinDate =
        !this.minDate ||
        new Date(o.createdAt).getTime() >= new Date(this.minDate).getTime();
      const matchMaxDate =
        !this.maxDate ||
        new Date(o.createdAt).getTime() <= new Date(this.maxDate).getTime();

      const matchSearchString =
        !this.searchString ||
        o.user.name.includes(this.searchString) ||
        o.user.email.includes(this.searchString);
      const matchStatus = !this.status || this.status === o.status;
      return (
        matchMinPrice &&
        matchMaxPrice &&
        matchSearchString &&
        matchMinDate &&
        matchMaxDate &&
        matchStatus
      );
    });

    this.$filteredOrders.next(filteredOrders);
  }
  clearFilter() {
    this.minPrice = 0;
    this.maxPrice = 0;
    this.minDate = '';
    this.maxDate = '';
    this.searchString = '';
    this.status = '';
  }
  add() {}

  // --- minPrice ---
  get minPrice(): number {
    return this._minPrice;
  }
  set minPrice(value: number) {
    this._minPrice = value;
    this.applyFilter();
  }

  // --- maxPrice ---
  get maxPrice(): number {
    return this._maxPrice;
  }
  set maxPrice(value: number) {
    this._maxPrice = value;
    this.applyFilter();
  }

  // --- minDate ---
  get minDate(): string {
    return this._minDate;
  }
  set minDate(value: string) {
    this._minDate = value;
    this.applyFilter();
  }

  // --- maxDate ---
  get maxDate(): string {
    return this._maxDate;
  }
  set maxDate(value: string) {
    this._maxDate = value;
    this.applyFilter();
  }

  // --- searchString ---
  get searchString(): string {
    return this._searchString;
  }
  set searchString(value: string) {
    this._searchString = value;
    this.applyFilter();
  }

  // --- status ---
  get status(): TOrderStatus {
    return this._status;
  }
  set status(value: TOrderStatus) {
    this._status = value;
    this.applyFilter();
  }
}
