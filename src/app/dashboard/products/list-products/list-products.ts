import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../shared/services/product';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../../../shared/services/category';
import { ICategory, IProduct } from '../../../shared/interfaces/IProduct';
import { ToastService } from '../../../shared/services/toast';
import { Modal } from '../../modal/modal';
import { isValidImage } from '../../../shared/validators/is-valid-image.validator';
import { ShortenPipe } from '../../../shared/pipes/shorten-pipe';
import { FallbackImagePipe } from '../../../shared/pipes/fallback-image-pipe';

@Component({
  selector: 'app-list-products',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    FormsModule,
    Modal,
    ReactiveFormsModule,
    DatePipe,
    ShortenPipe,
    FallbackImagePipe,
  ],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss',
})
export class ListProducts implements OnInit {
  categories: ICategory[] = [];
  selectedCategory = 0;
  isOpenAddModal = false;
  isOpenConfirmModal = false;
  searchStringModel!: string;
  editMode = false;
  selectedProduct!: IProduct | null;

  productForm!: FormGroup;

  //@ViewChild('filterForm') filterForm!: NgForm;

  constructor(
    public productService: Product,
    private categoriesService: Category,
    public toastService: ToastService
  ) {
    this.productForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      images: new FormArray([
        new FormControl('', [Validators.required], isValidImage()),
      ]),
    });
  }
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

  get productFormImages(): FormArray {
    return this.productForm.get('images') as FormArray;
  }
  addImageForm() {
    this.productFormImages.push(
      new FormControl('', [Validators.required], [isValidImage()])
    );
  }
  removeImageForm(i: number) {
    if (this.productFormImages.length > 1) {
      this.productFormImages.removeAt(i);
    }
  }
  onChangeCategory(categoryId: number) {
    this.productService.selectedCategoryId = Number(categoryId);
  }

  addModalConfirmEvt(state: boolean) {
    console.log(state);
    if (state) {
      this.onSubmit();
      this.toastService.show('Mentés gomb', 'bg-primary', 3000);
      this.isOpenAddModal = false;
    } else {
      this.isOpenAddModal = false;
    }
  }

  confirmModalEvt(state: boolean) {
    console.log(state);
    if (state) {
      this.deleteProduct(this.selectedProduct!);
    } else {
      this.isOpenConfirmModal = false;
    }
  }

  deleteProduct(product: IProduct) {
    this.productService.delete(product).subscribe({
      next: (response) => {
        this.toastService.show('Sikeres termék törlés', 'bg-success', 3000);
        this.isOpenConfirmModal = false;
      },
      error: (err) => {
        this.toastService.show('Hiba a termék törlésekor', 'bg-danger', 3000);
        this.isOpenConfirmModal = false;
      },
    });
  }

  openConfirmModal(product: IProduct) {
    this.selectedProduct = product;
    this.isOpenConfirmModal = true;
  }

  editProduct(product: IProduct) {
    this.editMode = true;
    this.isOpenAddModal = true;
    this.selectedProduct = product;

    this.productForm = new FormGroup({
      title: new FormControl(this.selectedProduct.title, [Validators.required]),
      price: new FormControl(this.selectedProduct.price, [Validators.required]),
      description: new FormControl(this.selectedProduct.description, [
        Validators.required,
      ]),
      categoryId: new FormControl(this.selectedProduct.category.id, [
        Validators.required,
      ]),
      images: new FormArray([]),
    });

    this.selectedProduct.images.forEach((i) => {
      console.log(i);
      this.productFormImages.push(
        new FormControl(i, [Validators.required], isValidImage())
      );
    });
  }

  onSubmit() {
    this.productForm.markAllAsTouched();

    if (this.productForm.valid) {
      if (!this.editMode) {
        this.productService.add(this.productForm.value).subscribe({
          next: (response) => {
            this.toastService.show(
              'Termék sikeresen hozzáadva' as string,
              'bg-primary',
              3000
            );
          },
          error: (err) => {
            this.toastService.show(
              'Hiba a termék felvitele során',
              'bg-danger',
              3000
            );
            console.log(err);
          },
        });
      } else {
        const product = this.productForm.value;
        product.id = this.selectedProduct!.id;
        this.productService.update(product).subscribe({
          next: (response) => {
            this.toastService.show('Sikeresen módosítva', 'bg-success', 3000);
            this.editMode = false;
            this.productForm.reset();

            console.log(response);
          },
          error: (err) => {
            console.log(err);
            this.toastService.show('Sikertelen módosítás', 'bg-danger', 3000);
          },
        });
      }
    }
  }
  resetFilter() {
    this.productService.clearFilter();
  }
  openAddModal() {
    this.productForm.reset();
    this.editMode = false;
    this.selectedProduct = null;
    this.isOpenAddModal = true;
  }
}
