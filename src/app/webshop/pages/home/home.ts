import { Component } from '@angular/core';
import { ListProducts } from '../../list-products/list-products';

@Component({
  selector: 'app-home',
  imports: [ListProducts],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
