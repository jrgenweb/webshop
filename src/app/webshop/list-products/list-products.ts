import { Component, OnInit } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Product } from '../../shared/services/product';
import { Filter } from './filter/filter';
import { Category } from '../../shared/services/category';
import { IProduct } from '../../shared/interfaces/IProduct';

@Component({
  selector: 'app-list-products',
  imports: [Filter],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss',
})
export class ListProducts implements OnInit {
  products: any;
  categories: any;
  constructor(
    private productService: Product,
    private categoryService: Category
  ) {}
  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (response) => {
        this.products = (response as IProduct[]).map((p) => {
          p.description = p.description.substring(0, 20);
          return p;
        });
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response;
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
}
