import { Injectable } from '@angular/core';
import { IProduct, ICart } from '../interfaces/IProduct';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  $cart = new BehaviorSubject<ICart[]>([]);

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
          amount,
          price: product.price,
          priceWithTax: product.price,
          sum: product.price,
        },
      ];
      this.$cart.next(updatedCart);
    }
  }

  remove(productId: number) {
    const updatedCart = this.$cart.value.filter(
      (cart) => cart.productId !== productId
    );
    this.$cart.next(updatedCart);
  }

  clear() {
    this.$cart.next([]);
  }
}
