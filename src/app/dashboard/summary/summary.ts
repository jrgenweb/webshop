import { Component, computed, effect, OnInit } from '@angular/core';

import { CommonModule, CurrencyPipe, NgFor } from '@angular/common';

import { SummaryService } from '../../shared/services/summary';
import { MaxValuePipe } from '../../shared/pipes/max-value-pipe';
import { RouterLink } from '@angular/router';
import { FallbackImagePipe } from '../../shared/pipes/fallback-image-pipe';
import { ShortenPipe } from '../../shared/pipes/shorten-pipe';
import { MatCardModule } from '@angular/material/card';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { provideCharts, BaseChartDirective } from 'ng2-charts';

import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { BarChart } from './bar-chart/bar-chart';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDivider } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardStepper } from '../card-stepper/card-stepper';
Chart.register(...registerables);
@Component({
  selector: 'app-summary',
  imports: [
    CurrencyPipe,
    MaxValuePipe,
    NgFor,
    RouterLink,
    FallbackImagePipe,
    ShortenPipe,
    MatCardModule,
    MatAnchor,
    MatButtonModule,
    CommonModule,
    BaseChartDirective,
    MatToolbar,
    MatDivider,
    MatGridListModule,
    CardStepper,
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.scss',
  providers: [provideCharts()],
  standalone: true,
})
export class Summary implements OnInit {
  summary: any;
  summaryCardData!: any[];
  avgPriceByCategory = computed(() => this.summary().avgPriceByCategory);
  productCountByCategory = computed(
    () => this.summary().productCountByCategory
  );
  newestProducts = computed(() => this.summary().newestProducts);

  productCountChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Termékek száma' }],
  };
  avgPriceChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Átlagár (Ft)' }],
  };

  productCountChartType: ChartType = 'bar';
  avgPriceChartType: ChartType = 'bar';

  productCountChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  avgPriceChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor(private summaryService: SummaryService) {
    effect(() => {
      const summary = this.summaryService.summary();

      this.productCountChartData.labels = summary.productCountByCategory.map(
        (c) => c.name
      );
      this.productCountChartData.datasets[0].data =
        summary.productCountByCategory.map((c) => c.count);

      this.avgPriceChartData.labels = summary.avgPriceByCategory.map(
        (c) => c.name
      );
      this.avgPriceChartData.datasets[0].data = summary.avgPriceByCategory.map(
        (c) => c.avg
      );

      this.summaryCardData = [
        {
          title: 'Összes termék',
          value: this.summary().totalProducts,
          url: '/dashboard/products',
        },
        {
          title: 'Kategóriák száma',
          value: this.summary().totalCategories,
          url: '/dashboard/products/categories',
        },
        {
          title: 'Felhasználók',
          value: this.summary().totalUsers,
          url: '/dashboard/users',
        },
        {
          title: 'Megrendelések',
          value: this.summary().totalOrders,
          url: '/dashboard/orders',
        },
      ];
    });
  }

  ngOnInit() {
    this.summary = this.summaryService.summary;
    this.summaryService.loadSummary();
  }
}
