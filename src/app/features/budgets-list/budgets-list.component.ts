import { Component, computed, signal, inject } from '@angular/core';
import { BudgetService } from '../../core/services/budget.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

 type SortOrder = 'date' | 'price' | 'name';

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

  sortBy = signal<SortOrder>('date');

    setSort(model: SortOrder) {
    this.sortBy.set(model);
  }

  selectedButton: {order: SortOrder; name:string}[] = [
    {
      order: 'date',
      name: 'Fecha'
    },
    {
      order: 'price',
      name: 'Precio'
    },
    {
      order: 'name',
      name: 'Nombre'
    }
  ]

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


}

