import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.scss',
})
export class BarChart implements AfterViewInit {
  @Input() title: string = 'Component Title';
  @Input() label!: string;
  @Input() dataLabels!: string[];
  @Input() dataSource!: number[];
  @Input() unit?: string;
  @ViewChild('ctx') ctx!: ElementRef;

  constructor() {}
  ngAfterViewInit(): void {
    Chart.register(...registerables);

    const myChart = new Chart(this.ctx.nativeElement, {
      type: 'bar',
      data: {
        labels: this.dataSource,

        datasets: [
          {
            label: this.label,

            data: this.dataSource,
          },
        ],
      },
    });
  }
}
