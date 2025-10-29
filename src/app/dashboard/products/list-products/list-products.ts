import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialog } from '../../confirm-dialog/confirm-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProductsDialog } from './add-products-dialog/add-products-dialog';

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
    MatFormField,
    MatIcon,
    MatHint,
    MatFormField,
    MatLabel,
    MatSlider,
    MatInputModule,
    MatSliderModule,
    MatDatepickerModule,
    MatAnchor,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss',
  providers: [provideNativeDateAdapter()],
})
export class ListProducts implements OnInit, AfterViewInit {
  categories: ICategory[] = [];
  selectedCategory = 0;

  searchStringModel!: string;

  maxPrice!: number;

  productForm!: FormGroup;

  displayedColumns: string[] = [
    'id',
    'avatar',
    'name',
    'price',
    'category',
    'created',
    'updated',
    'actions',
  ];
  dataSource!: MatTableDataSource<IProduct>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public productService: Product,
    private categoriesService: Category,
    public toastService: ToastService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.productService.$filteredProducts.subscribe((products) => {
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      if (products && products.length > 0)
        this.maxPrice =
          products.length > 0
            ? products.reduce((acc, curr) => {
                if (acc < curr.price) acc = curr.price;
                return acc;
              }, 0)
            : 0;
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
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  onChangeCategory(categoryId: number) {
    this.productService.selectedCategoryId = Number(categoryId);
  }

  openSnackBar(
    message: string,
    type: 'snackbar-success' | 'snackbar-error' | 'snackbar-info',
    action: string = 'OK',
    duration: number = 3000
  ) {
    this.snackBar.open(message, action, {
      duration, // ms, mennyi ideig látszik
      horizontalPosition: 'right', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'top', // 'top' | 'bottom'
      panelClass: type,
    });
  }
  openConfirmDialog(product: IProduct) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Törlés megerősítése',
        itemName: product.title,
        message: 'Biztosan törölni szeretnéd ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(product).subscribe({
          next: (response) => {
            this.openSnackBar('Sikeres termék törlés', 'snackbar-success');
          },
          error: (err) => {
            this.openSnackBar('Hiba a termék törlésekor', 'snackbar-error');
          },
        });
      }
    });
  }
  openAddDialog(product?: IProduct) {
    const dialogRef = this.dialog.open(AddProductsDialog, {
      data: { product: product, categories: this.categories },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result)
        if (product) {
          //akkor az update-t hívjuk meg
          result.id = product.id;
          this.productService.update(result).subscribe(() => {
            this.snackBar.open('Sikeresen módosítottad a terméket', 'OK');
          });
        } else {
          //hozzáadunk 1-et
          this.productService.add(result).subscribe(() => {
            this.snackBar.open('Sikeres termék felvitel', 'OK');
          });
        }
    });
  }

  resetFilter() {
    this.productService.clearFilter();
  }
}
