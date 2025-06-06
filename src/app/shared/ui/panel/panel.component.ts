import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../modal/modal.component";
import { BudgetService } from '../../../core/services/budget.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ButtonComponent, CommonModule, ModalComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})

export class PanelComponent {

  budgetService = inject(BudgetService);

  @Input() textPanel!:string;
  @Input() body!:string;
  @Input() unitPrice:number = 30;
  @Output() totalPanelPrice = new EventEmitter<number>();

  numberPanel: number = 1;
  showInfo: boolean = false;

  @Input() type!: 'pages' | 'languages'; 

  emit() {
    const value = this.numberPanel;
    if (this.type === 'pages') this.budgetService.setPages(value);
    if (this.type === 'languages') this.budgetService.setLanguages(value);
  }

  increase() {
      this.numberPanel++;
      this.emitPrice();
      this.emit();
  }

  decrease() {
    if(this.numberPanel > 1) {
      this.numberPanel--;
      this.emitPrice();
      this.emit();
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

  get bodyText() {
    return `Esto representa el ${this.textPanel.toLowerCase()} que se incluirán en el proyecto. Cada elemento adicional sumará ${this.unitPrice} €.`;
  }
}
