import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter {
  value!: string;
  @Output() onChangeEvent = new EventEmitter<string>();

  onKeyUp() {
    this.onChangeEvent.emit(this.value);
  }
}
