import { Routes } from '@angular/router';
import { Home } from './webshop/pages/home/home';
import { About } from './webshop/pages/about/about';
import { Contact } from './webshop/pages/contact/contact';
import { Signup } from './webshop/pages/signup/signup';
import { Signin } from './webshop/pages/signin/signin';
import { Error } from './webshop/error/error';
import { Cart } from './webshop/cart/cart';
import { ProductDetails } from './webshop/list-products/product-details/product-details';
import { LoginGuard } from './auth/login.guard';
import { AuthGuard } from './auth/auth.guard';
import { Profile } from './webshop/profile/profile';
import { Dashboard } from './dashboard/dashboard';
import { Summary } from './dashboard/summary/summary';
import { Webshop } from './webshop/webshop';
import { Orders } from './dashboard/orders/orders';
import { Products } from './dashboard/products/products';
import { Users } from './dashboard/users/users';
import { ListProducts } from './dashboard/products/list-products/list-products';
import { ListCategories } from './dashboard/products/list-categories/list-categories';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./webshop/webshop').then((c) => c.Webshop),
    children: [
      {
        path: 'webshop',

        children: [
          { path: '', component: Home },
          { path: 'product/:slug', component: ProductDetails },
        ],
      },
      { path: 'cart', component: Cart },
      { path: 'about', component: About },
      { path: 'contact', component: Contact },
      { path: 'signup', component: Signup, canActivate: [LoginGuard] },
      { path: 'signin', component: Signin, canActivate: [LoginGuard] },
      { path: 'profile', component: Profile, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/webshop', pathMatch: 'full' },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard').then((c) => c.Dashboard),
    //component: Dashboard,
    children: [
      { path: 'summary', component: Summary },
      { path: 'orders', component: Orders },
      {
        path: 'products',
        component: Products,
        children: [
          { path: '', component: ListProducts },
          { path: 'categories', component: ListCategories },
        ],
      },
      { path: 'users', component: Users },
      { path: '', redirectTo: '/dashboard/summary', pathMatch: 'full' },
    ],
  },
  { path: 'error', component: Error },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];
