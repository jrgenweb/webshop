import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {}
