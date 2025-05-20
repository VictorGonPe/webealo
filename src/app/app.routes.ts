import { Routes } from '@angular/router';
import { BudgetsListComponent } from './features/budgets-list/budgets-list.component';
import { BudgetDetailComponent } from './features/budget-detail/budget-detail.component';

export const routes: Routes = [
    { path: '', component: BudgetsListComponent },
    { path: 'presupuesto/:index', component: BudgetDetailComponent }
];
