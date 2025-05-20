import { Component, inject } from '@angular/core';
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

  index = Number(this.route.snapshot.paramMap.get('index'));
  budget = this.budgetService.budgets()[this.index];

}
