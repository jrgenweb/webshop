import { Component, OnInit } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Product } from '../../shared/services/product';
import { Filter } from './filter/filter';
import { Category } from '../../shared/services/category';
import { ICategory, IProduct } from '../../shared/interfaces/IProduct';
import { Cart } from '../../shared/services/cart';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-products',
  imports: [Filter, CurrencyPipe, FormsModule, AsyncPipe],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss',
})
export class ListProducts implements OnInit {
  categories!: ICategory[];

  /** filterhez */
  selectedCategoryId?: number;
  searchString?: string;

  constructor(
    public productService: Product,
    private categoryService: Category,
    private cartService: Cart
  ) {}
  ngOnInit(): void {
    this.productService.applyFilter();

    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response as ICategory[];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/600x400';
  }

  addToCart(product: IProduct, amount: number) {
    this.cartService.add(product, amount);
    console.log(this.cartService.$cart.value);
  }
}
