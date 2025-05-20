import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() title!: string;
  @Input() body!: string;
  @Input() priceModal!: number;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
