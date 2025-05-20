import { Component, computed, signal, inject } from '@angular/core';
import { BudgetService } from '../../core/services/budget.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.scss']
})

export class BudgetsListComponent {
  private budgetService = inject(BudgetService);

  budgets = this.budgetService.budgets;

  sortBy = signal<'date' | 'price' | 'name'>('date');

  sortedBudgets = computed(() => {
    const budgets = this.budgets();
    const sort = this.sortBy();

    return [...budgets].sort((a, b) => {
      switch (sort) {
        case 'date':
          return (b.addDate?.getTime() ?? 0) - (a.addDate?.getTime() ?? 0);
        case 'price':
          return b.total - a.total;
        case 'name':
          return a.name.localeCompare(b.name);
      }
    });
  });

  setSort(model: 'date' | 'price' | 'name') {
    this.sortBy.set(model);
  }
}

