import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/services/category';
import { ToastService } from '../../../shared/services/toast';
import { ICategory } from '../../../shared/interfaces/IProduct';
import { FallbackImagePipe } from '../../../shared/pipes/fallback-image-pipe';
import { DatePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShortenPipe } from '../../../shared/pipes/shorten-pipe';
import { Modal } from '../../modal/modal';
import { isValidImage } from '../../../shared/validators/is-valid-image.validator';

@Component({
  selector: 'app-list-categories',
  imports: [
    FallbackImagePipe,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    ShortenPipe,
    Modal,
  ],
  templateUrl: './list-categories.html',
  styleUrl: './list-categories.scss',
})
export class ListCategories implements OnInit {
  categories: ICategory[] = [];

  isOpenAddModal = false;
  isOpenConfirmModal = false;
  searchStringModel!: string;
  editMode = false;
  selectedCategory!: ICategory | null;

  categoryForm!: FormGroup;

  constructor(
    public categoryService: Category,
    public toastService: ToastService
  ) {
    this.createForm();
  }

  createForm(category?: ICategory) {
    this.categoryForm = new FormGroup({
      name: new FormControl(category ? category.name : '', [
        Validators.required,
      ]),
      image: new FormControl(
        category ? category.image : '',
        [Validators.required],
        [isValidImage()]
      ),
    });
  }

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

  openAddModal(category?: ICategory) {
    if (category) {
      this.createForm(category);
      this.selectedCategory = category;
      this.editMode = true;
    } else {
      this.editMode = false;
      this.selectedCategory = null;
      this.categoryForm.reset();
    }
    this.isOpenAddModal = true;
  }

  onAddModalConfirmEvent(state: boolean) {
    if (state) {
      //this.categoryService.add()

      this.addProduct();
    } else {
      this.isOpenAddModal = false;
    }
  }

  openConfirmModal(category: ICategory) {
    this.isOpenConfirmModal = true;
    this.selectedCategory = category;
  }

  confirmDeleteEvt(state: boolean) {
    if (state) {
      this.categoryService.delete(this.selectedCategory!.id).subscribe({
        next: (response) => {
          this.selectedCategory = null;
          this.isOpenConfirmModal = false;
          this.toastService.show(
            'Sikeres kategória törlés',
            'bg-success',
            3000
          );
        },
        error: (err) => {
          this.toastService.show(
            'Hiba a kategória törlésekor',
            'bg-danger',
            3000
          );
          console.error(err);
        },
      });
    } else {
      this.selectedCategory = null;
    }
  }

  addProduct() {
    this.categoryForm.markAllAsTouched();
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;
      if (this.editMode) {
        category.id = this.selectedCategory?.id;
        this.categoryService.update(category).subscribe({
          next: (response) => {
            this.toastService.show(
              'Sikeres kategória módosítás',
              'bg-success',
              3000
            );
            this.isOpenAddModal = false;
            this.categoryForm.reset();
          },
          error: (err) => {
            this.toastService.show(
              'Sikertelen kategória módosítás',
              'bg-danger',
              3000
            );
          },
        });
      } else {
        this.categoryService.add(category).subscribe({
          next: (response) => {
            this.toastService.show(
              'Sikeres kategória hozzáadás',
              'bg-success',
              3000
            );
            this.isOpenAddModal = false;
            this.categoryForm.reset();
          },
          error: (err) => {
            this.toastService.show(
              'Sikertelen kategória hozzáadás',
              'bg-danger',
              3000
            );
          },
        });
      }
    }
  }
}
