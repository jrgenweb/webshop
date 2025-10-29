import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Order } from '../../shared/services/order';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from '../../shared/pipes/shorten-pipe';
import { FallbackImagePipe } from '../../shared/pipes/fallback-image-pipe';
import { IOrder, TOrderStatus } from '../../shared/interfaces/IProduct';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

import {
  MatSlider,
  MatSliderModule,
  MatSliderThumb,
} from '@angular/material/slider';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-orders',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    FallbackImagePipe,
    ShortenPipe,
    FormsModule,
    ReactiveFormsModule,
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
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
  providers: [provideNativeDateAdapter()],
})
export class Orders implements AfterViewInit {
  /*
  id: number;
  user: IUser;
  products: IOrderProducts[];
  total: number;
  status: TOrderStatus;
  createdAt: string;*/
  status!: TOrderStatus;
  displayedColumns: string[] = [
    'id',
    'avatar',
    'name',
    'total',
    'status',
    'created',
    'actions',
  ];
  dataSource!: MatTableDataSource<IOrder>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public orderService: Order) {
    this.orderService.$filteredOrders.subscribe((orders) => {
      this.dataSource = new MatTableDataSource<IOrder>(orders);
      this.dataSource.paginator = this.paginator;
    });
  }

  onStatusChange() {
    this.orderService.status = this.status;
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
