import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/services/product';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../shared/services/category';
import { ICategory } from '../../../shared/interfaces/IProduct';
import { ToastService } from '../../../shared/services/toast';

@Component({
  selector: 'app-list-products',
  imports: [AsyncPipe, CurrencyPipe, FormsModule],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss',
})
export class ListProducts implements OnInit {
  categories: ICategory[] = [];
  selectedCategory = 0;
  constructor(
    public productService: Product,
    private categoriesService: Category,
    public toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.selectedCategory = this.productService.selectedCategoryId as number;

    this.categoriesService.getAll().subscribe({
      next: (response) => {
        this.categories = response as ICategory[];
      },
      error: (err) => {
        this.toastService.show(
          'Hiba a kategóriák betöltésekor',
          'bg-danger',
          3000
        );
        console.error(err);
      },
    });
    this.productService.applyFilter();
  }

  onChangeCategory(categoryId: number) {
    this.productService.selectedCategoryId = categoryId;
  }
}
