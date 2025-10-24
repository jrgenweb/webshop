import { Component } from '@angular/core';
import { Order } from '../../shared/services/order';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from '../../shared/pipes/shorten-pipe';
import { FallbackImagePipe } from '../../shared/pipes/fallback-image-pipe';
import { TOrderStatus } from '../../shared/interfaces/IProduct';

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
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {
  status!: TOrderStatus;
  constructor(public orderService: Order) {}

  onStatusChange() {
    this.orderService.status = this.status;
  }
}
