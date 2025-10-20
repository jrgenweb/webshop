import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartBadge } from '../cart/cart-badge/cart-badge';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CartBadge],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {}
