import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/services/product';
import { Filter } from './filter/filter';
import { Category } from '../../shared/services/category';
import { ICategory, IProduct } from '../../shared/interfaces/IProduct';
import { Cart } from '../../shared/services/cart';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductCard } from './product-card/product-card';

@Component({
  selector: 'app-list-products',
  imports: [Filter, FormsModule, AsyncPipe, ProductCard, NgIf],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss',
})
export class ListProducts implements OnInit {
  categories!: ICategory[];
  amount: number = 1;
  isFilterCollapsed = true;

  constructor(
    public productService: Product,
    private categoryService: Category,
    private cartService: Cart
  ) {}
  ngOnInit(): void {
    this.productService.applyFilter();
    this.productService.$filteredProducts.subscribe({
      next: (products) => {},
    });

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
  }

  toggleFilter() {
    this.isFilterCollapsed = !this.isFilterCollapsed;
  }
}
