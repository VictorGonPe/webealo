import { Budget } from "../models/budget.models";
import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class BudgetService {

    private budgetsSignal = signal<Budget[]>([]);

    get budgets() {
        return this.budgetsSignal.asReadonly(); 
    }

    addBudget(budget: Budget) {
        this.budgetsSignal.update(budgets => [...budgets, budget]);
    }
}