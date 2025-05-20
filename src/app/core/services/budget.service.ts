import { Budget } from "../models/budget.models";
import { computed, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class BudgetService {

    // Cliente
    clientName = signal('');
    clientPhone = signal('');
    clientEmail = signal('');

    // Button
    formTouched = signal(false);
    showWarningModal = signal(false);
    warningTitle = signal('');
    warningBody = signal('');

    // Servicios disponibles
    cards = signal([
        { title: 'Seo', subtitle: 'Mejora tu visibilidad', price: 300, selected: false },
        { title: 'Ads', subtitle: 'Campañas de Google Ads', price: 400, selected: false },
        { title: 'Web', subtitle: 'Web responsive completa', price: 500, selected: false }
    ]);

    // Extras de Web
    pages = signal(1);
    languages = signal(1);
    finalExtraPrice = signal(0);

    // Presupuestos guardados
    private budgetsSignal = signal<Budget[]>([]);
    get budgets() {
        return this.budgetsSignal.asReadonly();
    }

    // Computeds
    isNameValid = computed(() => this.clientName().trim().length > 0);
    isPhoneValid = computed(() => this.clientPhone().trim().length > 0);
    isEmailValid = computed(() =>
        /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.clientEmail().trim())
    );

    isFormValid = computed(() =>
        this.isNameValid() && this.isPhoneValid() && this.isEmailValid()
    );

    totalSelected = computed(() =>
        this.cards().filter(c => c.selected).reduce((sum, c) => sum + c.price, 0)
    );

    finalTotal = computed(() =>
        this.totalSelected() + this.finalExtraPrice()
    );

    showClientForm = computed(() =>
        this.cards().some(c => c.selected)
    );

    getSelectedTitles = () =>
        this.cards().filter(c => c.selected).map(c => c.title);

    selection(title: string) {
        this.cards.update(cards =>
            cards.map(c => c.title === title ? { ...c, selected: !c.selected } : c)
        );
    }

    setPages(value: number) {
        this.pages.set(value);
    }

    setLanguages(value: number) {
        this.languages.set(value);
    }

    setExtraPrice(value: number) {
        this.finalExtraPrice.set(value);
    }

    generateId(): string {
        return crypto.randomUUID(); 
    }

    addBudget(budget: Budget) {
        const newBudget = {
            ...budget,
            id: this.generateId(),
            addDate: new Date()
        };

        const updated = [...this.budgetsSignal(), newBudget];
        this.budgetsSignal.set(updated);
    }

    saveBudget() {

        this.formTouched.set(true);

        if (!this.showClientForm()) {
            this.warningTitle.set('Selecciona un servicio');
            this.warningBody.set('Debes seleccionar al menos un servicio.');
            this.showWarningModal.set(true);
            return;
        }

        if (!this.isFormValid()) return;

        this.addBudget({
            id: this.generateId(),
            name: this.clientName(),
            phone: this.clientPhone(),
            email: this.clientEmail(),
            services: this.getSelectedTitles(),
            pages: this.pages(),
            languages: this.languages(),
            total: this.finalTotal()
        });

        this.reset();
    }

    reset() {
        this.clientName.set('');
        this.clientPhone.set('');
        this.clientEmail.set('');
        this.formTouched.set(false);
        this.pages.set(1);
        this.languages.set(1);
        this.finalExtraPrice.set(0);

        this.cards.update(cards =>
            cards.map(c => ({ ...c, selected: false }))
        );
    }
}
