import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/services/product';
import { Cart as CartService } from '../../shared/services/cart';
import { AsyncPipe, CurrencyPipe, DecimalPipe, NgIf } from '@angular/common';
import { UnitPipe } from '../../shared/pipes/unit-pipe';
import { RouterLink } from '@angular/router';
import { Signin } from '../pages/signin/signin';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, CurrencyPipe, AsyncPipe, UnitPipe, RouterLink, Signin],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  isLoggedIn = false;
  constructor(public cartService: CartService, public authService: Auth) {}

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
