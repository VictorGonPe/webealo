import { Budget } from "../models/budget.models";
import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class BudgetService {

    private budgetsSignal = signal<Budget[]>([]);
    pages = signal<number>(0);
    languages = signal<number>(0);

    get budgets() {
        return this.budgetsSignal.asReadonly();
    }

    setPages(value: number) {
        this.pages.set(value);
    }

    setLanguages(value: number) {
        this.languages.set(value);
    }

    addBudget(budget: Budget) {
        this.budgetsSignal.update(budgets => [...budgets, budget]);
    }
}