import { Routes } from '@angular/router';
import { ListProducts } from './webshop/list-products/list-products';
import { Home } from './webshop/pages/home/home';
import { About } from './webshop/pages/about/about';
import { Contact } from './webshop/pages/contact/contact';
import { Signup } from './webshop/pages/signup/signup';
import { Signin } from './webshop/pages/signin/signin';

export const routes: Routes = [
  { path: 'webshop', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'signup', component: Signup },
  { path: 'signin', component: Signin },
  { path: '', redirectTo: '/webshop', pathMatch: 'full' },
  { path: 'error', component: Error },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];
