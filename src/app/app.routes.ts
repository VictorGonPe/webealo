import { Routes } from '@angular/router';
import { BudgetsListComponent } from './features/budgets-list/budgets-list.component';
import { BudgetDetailComponent } from './features/budget-detail/budget-detail.component';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'presupuesto/:id', component: BudgetDetailComponent }
];
