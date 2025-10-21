import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Toast } from '../toast/toast';

@Component({
  selector: 'app-webshop',
  imports: [Navbar, RouterOutlet, Toast],
  templateUrl: './webshop.html',
  styleUrl: './webshop.scss',
})
export class Webshop {}
