import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ButtonComponent,CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})

export class PanelComponent {
  @Input() textPanel!:string;
  @Output() totalPanelPrice = new EventEmitter<number>();

  numberPanel: number = 1;
  showInfo: boolean = false;

  increase() {
      this.numberPanel++;
      this.emitPrice();
  }

  decrease() {
    if(this.numberPanel > 1) {
      this.numberPanel--;
      this.emitPrice();
    }
  }

  emitPrice() {
      const price = (this.numberPanel - 1) * 30;
      this.totalPanelPrice.emit(price);
  }

  openInfo() {
    this.showInfo = true;
  }

  closeInfo() {
    this.showInfo = false;
  }
}
