import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../shared/services/cart';
import { ICart } from '../../../shared/interfaces/IProduct';

@Component({
  selector: 'app-cart-badge',
  imports: [],
  templateUrl: './cart-badge.html',
  styleUrl: './cart-badge.scss',
})
export class CartBadge implements OnInit {
  count = 1;

  constructor(private cartService: Cart) {}
  ngOnInit(): void {
    const cart = this.cartService.$cart.value;

    this.cartService.$cart.subscribe({
      next: (cart) => {
        this.count = cart.reduce((acc: number, curr: ICart) => {
          return (acc = acc + curr.amount);
        }, 0);
      },
      error: (err) => {},
    });
  }
}
