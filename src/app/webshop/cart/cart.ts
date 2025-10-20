import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/services/product';
import { Cart as CartService } from '../../shared/services/cart';
import { AsyncPipe, CurrencyPipe, DecimalPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, CurrencyPipe, DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  constructor(
    public cartService: CartService,
    private productService: Product
  ) {}

  ngOnInit(): void {}
  getCount() {
    const cart = this.cartService.$cart.value;
    return cart.reduce((acc, curr) => (acc = acc + curr.amount), 0);
  }
  getSum() {
    const cart = this.cartService.$cart.value;
    return cart.reduce(
      (acc, curr) => (acc = acc + curr.priceWithTax * curr.amount),
      0
    );
  }
  onDelete(productId: number) {
    this.cartService.remove(productId);
  }
}
