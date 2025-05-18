import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BudgetService } from '../../core/services/budget.service';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss'
})
export class BudgetsListComponent {
  private budgetService = inject(BudgetService);
  budgets = this.budgetService.budgets;
}
