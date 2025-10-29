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
  selector: 'app-add-category-dialog',
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
  templateUrl: './add-category-dialog.html',
  styleUrl: './add-category-dialog.scss',
})
export class AddCategoryDialog {
  categoryForm!: FormGroup;
  categories!: ICategory[];
  selectedCategory!: ICategory;

  constructor(
    private dialogRef: MatDialogRef<AddCategoryDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { category: ICategory }
  ) {
    this.createForm(data?.category);
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

  close(result: boolean) {
    this.dialogRef.close(result);
  }
  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryForm.markAllAsTouched();
      this.dialogRef.close(this.categoryForm.value);
      return;
    }
  }
}
