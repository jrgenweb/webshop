import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../shared/services/product';
import { IProduct } from '../../../shared/interfaces/IProduct';
import { CurrencyPipe } from '@angular/common';
import { Cart } from '../../../shared/services/cart';
import { FormsModule } from '@angular/forms';
import { ImgGallery } from './img-gallery/img-gallery';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, CurrencyPipe, FormsModule, ImgGallery],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  product!: IProduct;
  amount: number = 1;
  constructor(
    private route: ActivatedRoute,
    private productService: Product,
    public cartService: Cart
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') as string;
    this.product = this.productService.getBySlug(slug);
  }
}
