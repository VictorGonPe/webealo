import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../core/services/budget.service';

@Component({
  selector: 'app-budget-detail',
  standalone: true,
  imports: [],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget-detail.component.scss'
})
export class BudgetDetailComponent {
  private route = inject(ActivatedRoute);
  private budgetService = inject(BudgetService);

  index = Number(this.route.snapshot.paramMap.get('index'));
  budget = this.budgetService.budgets()[this.index];

}
