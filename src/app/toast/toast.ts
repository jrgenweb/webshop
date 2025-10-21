import { Component, Input } from '@angular/core';
import { ToastService, IToast } from '../shared/services/toast';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  @Input() type!: string;
  toasts: IToast[] = [];

  constructor(private toastService: ToastService) {
    this.toastService.toasts$.subscribe((ts) => (this.toasts = ts));
  }

  remove(id: number) {
    this.toastService.remove(id);
  }
}
