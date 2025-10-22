import { Component, computed, OnInit } from '@angular/core';

import { CurrencyPipe, NgFor } from '@angular/common';

import { SummaryService } from '../../shared/services/summary';
import { MaxValuePipe } from '../../shared/pipes/max-value-pipe';

@Component({
  selector: 'app-summary',
  imports: [CurrencyPipe, MaxValuePipe, NgFor],
  templateUrl: './summary.html',
  styleUrl: './summary.scss',
})
export class Summary implements OnInit {
  summary: any;
  avgPriceByCategory = computed(() => this.summary().avgPriceByCategory);
  productCountByCategory = computed(
    () => this.summary().productCountByCategory
  );

  constructor(private summaryService: SummaryService) {}

  ngOnInit() {
    this.summary = this.summaryService.summary;
    this.summaryService.loadSummary();
  }
}
