import { Component, ViewEncapsulation } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Toast } from '../toast/toast';

@Component({
  selector: 'app-webshop',
  imports: [Navbar, RouterOutlet, Toast],
  templateUrl: './webshop.html',
  styleUrls: [
    './../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    './webshop.scss',
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class Webshop {}
