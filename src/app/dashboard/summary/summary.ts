import { Component, computed, OnInit } from '@angular/core';

import { CurrencyPipe, NgFor } from '@angular/common';

import { SummaryService } from '../../shared/services/summary';
import { MaxValuePipe } from '../../shared/pipes/max-value-pipe';
import { RouterLink } from '@angular/router';
import { FallbackImagePipe } from '../../shared/pipes/fallback-image-pipe';
import { ShortenPipe } from '../../shared/pipes/shorten-pipe';

@Component({
  selector: 'app-summary',
  imports: [
    CurrencyPipe,
    MaxValuePipe,
    NgFor,
    RouterLink,
    FallbackImagePipe,
    ShortenPipe,
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.scss',
})
export class Summary implements OnInit {
  summary: any;
  avgPriceByCategory = computed(() => this.summary().avgPriceByCategory);
  productCountByCategory = computed(
    () => this.summary().productCountByCategory
  );
  newestProducts = computed(() => this.summary().newestProducts);

  constructor(private summaryService: SummaryService) {}

  ngOnInit() {
    this.summary = this.summaryService.summary;
    this.summaryService.loadSummary();
  }
}
