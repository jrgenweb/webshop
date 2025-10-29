import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { ICategory, IProduct } from '../../../../shared/interfaces/IProduct';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isValidImage } from '../../../../shared/validators/is-valid-image.validator';
import { FallbackImagePipe } from '../../../../shared/pipes/fallback-image-pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-products-dialog',
  imports: [
    ReactiveFormsModule,
    FallbackImagePipe,
    MatDialogTitle,
    MatDialogContent,
    MatDialogModule,
    MatButtonModule,
    MatFormField,
    MatLabel,
    MatHint,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './add-products-dialog.html',
  styleUrl: './add-products-dialog.scss',
})
export class AddProductsDialog {
  productForm!: FormGroup;
  categories!: ICategory[];
  selectedCategory!: ICategory;

  constructor(
    private dialogRef: MatDialogRef<AddProductsDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { product: IProduct; categories: ICategory[] }
  ) {
    this.productForm = new FormGroup({
      title: new FormControl(data.product ? data.product.title : '', [
        Validators.required,
      ]),
      price: new FormControl(data.product ? data.product.price : '', [
        Validators.required,
      ]),
      description: new FormControl(
        data.product ? data.product.description : '',
        [Validators.required]
      ),
      categoryId: new FormControl(
        data.product ? data.product.category.id : '',
        [Validators.required]
      ),
      images: new FormArray([]),
    });

    if (data.product) {
      if (data.product.images.length > 0) {
        data.product.images.forEach((i) => {
          this.addImageForm(i);
        });
      } else {
        this.addImageForm();
      }
    } else {
      this.addImageForm();
    }

    this.categories = data.categories;
  }

  get productFormImages(): FormArray {
    return this.productForm.get('images') as FormArray;
  }
  addImageForm(value?: string) {
    this.productFormImages.push(
      new FormControl(
        value ? value : '',
        [Validators.required],
        [isValidImage()]
      )
    );
  }
  removeImageForm(i: number) {
    if (this.productFormImages.length > 1) {
      this.productFormImages.removeAt(i);
    }
  }
  editProduct(product: IProduct) {
    /*  this.editMode = true;
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
    }); */
  }
  close(result: boolean) {
    this.dialogRef.close(result);
  }
  onSubmit() {
    if (this.productForm.valid) {
      this.productForm.markAllAsTouched();
      this.dialogRef.close(this.productForm.value);
      return;
    }
  }
}
