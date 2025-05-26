import { Component, inject } from '@angular/core';
import { CardComponent } from '../../shared/ui/card/card.component';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../../core/services/budget.service';
import { ClientFormComponent } from "../client-form/client-form.component";

@Component({
  selector: 'app-main-form',
  standalone: true,
  imports: [CardComponent, CommonModule, ClientFormComponent],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent {
  budgetService = inject(BudgetService);
}
