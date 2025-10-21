import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IToast {
  text: string;
  type: 'bg-success' | 'bg-danger' | 'bg-warning' | 'bg-primary';
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<IToast[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  private counter = 0;

  show(text: string, type: IToast['type'] = 'bg-success', duration = 3000) {
    const id = ++this.counter;
    const newToast: IToast = { text, type, id };
    this.toastsSubject.next([...this.toastsSubject.getValue(), newToast]);

    setTimeout(() => this.remove(id), duration);
  }

  remove(id: number) {
    const updated = this.toastsSubject.getValue().filter((t) => t.id !== id);
    this.toastsSubject.next(updated);
  }
}
