import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/services/category';
import { ToastService } from '../../../shared/services/toast';
import { ICategory } from '../../../shared/interfaces/IProduct';

@Component({
  selector: 'app-list-categories',
  imports: [],
  templateUrl: './list-categories.html',
  styleUrl: './list-categories.scss',
})
export class ListCategories implements OnInit {
  categories: ICategory[] = [];
  constructor(
    public categoryService: Category,
    public toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response as ICategory[];
      },
      error: (err) => {
        this.toastService.show(
          'Hiba a kategóriák betöltésekor',
          'bg-danger',
          3000
        );
        console.log(err);
      },
    });
  }
}
