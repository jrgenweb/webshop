import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  @Input() confirmButton: string = 'Ok';
  @Input() cancelButton: string = 'Mégse';
  @Input() title: string = 'Modal ablak';
  @Input() show = true;

  @Output() confirmEvent = new EventEmitter<boolean>();

  onConfirm(state: boolean) {
    this.confirmEvent.emit(state);
  }
}
