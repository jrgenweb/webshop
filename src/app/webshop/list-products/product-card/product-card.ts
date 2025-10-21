import { Component, Input } from '@angular/core';
import { IProduct } from '../../../shared/interfaces/IProduct';
import { onImageError } from '../../../shared/functions';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Cart } from '../../../shared/services/cart';
import { FormsModule } from '@angular/forms';
import { ShortenPipe } from '../../../shared/pipes/shorten-pipe';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe, FormsModule, ShortenPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: IProduct;
  amount: number = 1;
  constructor(public cartService: Cart) {}
  onImageError(event: Event) {
    onImageError(event);
  }
}
