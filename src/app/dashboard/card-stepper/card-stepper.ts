import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-stepper',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './card-stepper.html',
  styleUrl: './card-stepper.scss',
})
export class CardStepper implements AfterContentInit {
  @ViewChild('slider-container') container!: ElementRef;
  @ContentChildren('slide') slides!: QueryList<any>;

  @Input() title = 'Title';

  currentIndex = 0;
  slideWidth = 100; //percentige

  ngAfterContentInit() {
    this.update();
  }

  next() {
    if (this.currentIndex < this.slides.length - 1) this.currentIndex++;
    this.update();
  }

  prev() {
    if (this.currentIndex > 0) this.currentIndex--;
    this.update();
  }

  update() {
    const offset = -this.currentIndex * 100;
    this.slides.forEach((slide: any) => {
      (
        slide.nativeElement as HTMLElement
      ).style.transform = `translateX(${offset}%)`;
    });
  }
}
