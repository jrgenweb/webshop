import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartBadge } from '../cart/cart-badge/cart-badge';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CartBadge],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  collapsed = false;
  isDropdownOpen = false;
  constructor(public authService: Auth) {}

  toggleDropdown(event: Event) {
    event?.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-item.dropdown')) {
      this.isDropdownOpen = false;
    }
  }
}
