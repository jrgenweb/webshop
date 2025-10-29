import { Component, effect, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../../shared/services/category';

import { ICategory } from '../../../shared/interfaces/IProduct';
import { FallbackImagePipe } from '../../../shared/pipes/fallback-image-pipe';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from '../../../shared/pipes/shorten-pipe';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddCategoryDialog } from './add-category-dialog/add-category-dialog';
import { ConfirmDialog } from '../../confirm-dialog/confirm-dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-list-categories',
  imports: [
    FallbackImagePipe,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    ShortenPipe,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIcon,
    MatPaginatorModule,
  ],
  templateUrl: './list-categories.html',
  styleUrl: './list-categories.scss',
})
export class ListCategories {
  categories: ICategory[] = [];
  searchStringModel!: string;
  selectedCategory!: ICategory | null;

  dataSource!: MatTableDataSource<ICategory>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'id',
    'image',
    'name',
    'slug',
    'created',
    'updated',
    'actions',
  ];
  constructor(
    public categoryService: Category,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    effect(() => {
      const cats = this.categoryService.filteredCategories(); // lekérdezi a signal aktuális értékét
      this.dataSource = new MatTableDataSource(cats); // beállítja a táblázatot
      this.dataSource.paginator = this.paginator;
    });
  }

  openConfirmDialog(category: ICategory) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Törlés megerősítése',
        itemName: category.name,
        message: 'Biztosan törölni szeretnéd ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.delete(category.id).subscribe({
          next: (response) => {
            this.snackBar.open('Sikeres termék törlés', 'snackbar-success');
          },
          error: (err) => {
            this.snackBar.open('Hiba a termék törlésekor', 'snackbar-error');
          },
        });
      }
    });
  }

  openAddDialog(category?: ICategory) {
    const dialogRef = this.dialog.open(AddCategoryDialog, {
      data: { category: category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        if (category) {
          //akkor az update-t hívjuk meg
          result.id = category.id;
          this.categoryService.update(result).subscribe(() => {
            this.snackBar.open('Sikeresen módosítottad a kategóriát', 'OK');
          });
        } else {
          //hozzáadunk 1-et
          this.categoryService.add(result).subscribe(() => {
            this.snackBar.open('Sikeres kategória felvitel', 'OK');
          });
        }
    });
  }
}
