import { Component, EventEmitter, Output, Input } from '@angular/core';
import { PanelComponent } from "../panel/panel.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone:true,
  imports: [PanelComponent,CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() basePrice!: number;
  @Input() selected: boolean = false;

  @Output() selectedChange = new EventEmitter<string>();
  @Output() extraTotalPrice = new EventEmitter<number>();

  totalPages: number = 0;
  totalLenguages: number = 0;

  onCheckboxChange() {
    this.selectedChange.emit(this.title);

    if (this.title === 'Web' && this.selected) {
    this.resetPanels();
  }
  }

  get totalPanelPrice(): number {
    return this.totalPages + this.totalLenguages;
  }

  onPanelPrice1(pricePanel: number) {
    this.totalPages = pricePanel;
    this.emitCombinatedTotal();
  }

  onPanelPrice2(pricePanel: number) {
    this.totalLenguages = pricePanel;
    this.emitCombinatedTotal();
  }

  emitCombinatedTotal() {
    this.extraTotalPrice.emit(this.totalPanelPrice);
  }

  resetPanels() {
    this.totalPages = 0;
    this.totalLenguages = 0;
    this.emitCombinatedTotal();
  }

}
