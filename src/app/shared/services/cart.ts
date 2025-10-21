import { Injectable } from '@angular/core';
import { IProduct, ICart } from '../interfaces/IProduct';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  $cart = new BehaviorSubject<ICart[]>([]);

  constructor(private toastService: ToastService) {}

  add(product: IProduct, amount: number) {
    const currentCart = this.$cart.value; // az aktuális kosár tartalma
    const existingItem = currentCart.find(
      (cart) => cart.productId === product.id
    );

    if (existingItem) {
      // ha már van, növeljük a mennyiséget
      const updatedCart = currentCart.map((cart) =>
        cart.productId === product.id
          ? {
              ...cart,
              amount: cart.amount + amount,
              sum: (cart.amount + amount) * cart.priceWithTax,
            }
          : cart
      );
      this.$cart.next(updatedCart);
    } else {
      // ha új termék, hozzáadjuk a listához
      const updatedCart = [
        ...currentCart,
        {
          productId: product.id,
          productName: product.title,
          productImg: product.images[0],
          slug: product.slug,
          amount,
          price: product.price,
          priceWithTax: product.price,
          sum: product.price,
        },
      ];
      this.$cart.next(updatedCart);
    }
    this.toastService.show(
      'Sikeresen hozzáadtad a terméket!',
      'bg-primary',
      3000
    );
  }

  remove(productId: number) {
    const updatedCart = this.$cart.value.filter(
      (cart) => cart.productId !== productId
    );
    this.$cart.next(updatedCart);
    this.toastService.show(
      'Sikeresen törölted a terméket a kosárból!',
      'bg-danger',
      3000
    );
  }

  clear() {
    this.$cart.next([]);
  }
}
