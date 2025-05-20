import { Component, signal, computed, WritableSignal, inject } from '@angular/core';
import { CardComponent } from '../../shared/ui/card/card.component';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../../core/services/budget.service';
import { BudgetsListComponent } from "../budgets-list/budgets-list.component";
import { ClientFormComponent } from "../client-form/client-form.component";
import { ModalComponent } from '../../shared/ui/modal/modal.component';

@Component({
  selector: 'app-main-form',
  standalone: true,
  imports: [CardComponent, CommonModule, ClientFormComponent, BudgetsListComponent, ModalComponent],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent {
  budgetService = inject(BudgetService);
}
