import { Component } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatTabsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  selectedIndex = 0;

  tabs = [
    { label: 'Termékek', route: '/dashboard/products' },
    { label: 'Kategóriák', route: '/dashboard/products/categories' },
  ];

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const index = this.tabs.findIndex((tab) =>
        this.router.url.startsWith(tab.route)
      );
      this.selectedIndex = index >= 0 ? index : 0;
    });
  }

  onTabChange(event: MatTabChangeEvent) {
    this.router.navigateByUrl(this.tabs[event.index].route);
  }
}
