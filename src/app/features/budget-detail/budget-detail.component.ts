import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../core/services/budget.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget-detail.component.scss'
})
export class BudgetDetailComponent {
  private route = inject(ActivatedRoute);
  private budgetService = inject(BudgetService);

  budget = signal<any>(null);

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const found = this.budgetService.budgets().find(b => b.id === id);
      this.budget.set(found ?? null);
    });

  }
}
