import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})

export class PanelComponent {
  @Input() textPanel!:string;
  numberPanel: number = 1;
  @Output() totalPanelPrice = new EventEmitter<number>();

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
    const price = this.numberPanel * 30;
    this.totalPanelPrice.emit(price);
  }

}
