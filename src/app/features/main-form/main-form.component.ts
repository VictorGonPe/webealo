import { Component, signal, computed, WritableSignal, inject } from '@angular/core';
import { CardComponent } from '../../shared/ui/card/card.component';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../../core/services/budget.service';
import { BudgetsListComponent } from "../budgets-list/budgets-list.component";
import { ClientFormComponent } from "../client-form/client-form.component";
import { ModalComponent } from '../../shared/ui/modal/modal.component';


@Component({
  selector: 'app-main-form',
  standalone: true,
  imports: [CardComponent, CommonModule, ClientFormComponent, BudgetsListComponent, ModalComponent],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent {

  // Datos del cliente
  clientName: WritableSignal<string> = signal('');
  clientPhone: WritableSignal<string> = signal('');
  clientEmail: WritableSignal<string> = signal('');

  isNameValid = computed(() => this.clientName().trim().length > 0);
  isPhoneValid = computed(() => this.clientPhone().trim().length > 0);
  isEmailValid = computed(() =>
    /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.clientEmail().trim())
  );

  formTouched = signal(false);

  showWarningModal = signal(false);
  warningTitle = signal('');
  warningBody = signal('');


  isFormValid = computed(() =>
    this.isNameValid() && this.isPhoneValid() && this.isEmailValid()
  );

  budgetService = inject(BudgetService);

  cards: WritableSignal<{ title: string; subtitle: string; price: number; selected: boolean }[]> = signal([
    {
      title: 'Seo',
      subtitle: 'Mejora tu visibilidad en buscadores y atrae más clientes orgánicos',
      price: 300,
      selected: false
    },
    {
      title: 'Ads',
      subtitle: 'Gestión de campañas en Google Ads para maximizar tus conversiones',
      price: 400,
      selected: false
    },
    {
      title: 'Web',
      subtitle: 'Desarrollo de una web responsive optimizada para todos los dispositivos',
      price: 500,
      selected: false
    }
  ]);

  selection(title: string) {
    this.cards.update(cards =>
      cards.map(card =>
        card.title === title
          ? { ...card, selected: !card.selected }
          : card
      )
    );
  }

  showClientForm = computed(() => this.cards().some(c => c.selected));

  totalSelected = computed(() =>
    this.cards()
      .filter(card => card.selected)
      .reduce((sum, card) => sum + card.price, 0)
  );


  finalExtraPrice = signal(0);

  onFinalPrice(extra: number) {
    this.finalExtraPrice.set(extra);
  }

  finalTotal = computed(() => this.totalSelected() + this.finalExtraPrice());

  updateSignalFromInput(signal: WritableSignal<string>, event: Event) {
    const input = event.target as HTMLInputElement;
    signal.set(input.value);
  }

  getSelectedTitles() {
    return this.cards().filter(c => c.selected).map(c => c.title);
  }

  saveBudget() {
    this.formTouched.set(true);

    if (!this.showClientForm()) {
      this.warningTitle.set('Selecciona un servicio');
      this.warningBody.set('Debes seleccionar al menos un servicio antes de pedir presupuesto.');
      this.showWarningModal.set(true);
      return;
    }

    if (!this.isFormValid()) {
      return;
    }


    this.budgetService.addBudget({
      clientName: this.clientName(),
      phone: this.clientPhone(),
      email: this.clientEmail(),
      services: this.getSelectedTitles(),
      total: this.finalTotal()
    });

    this.clientName.set('');
    this.clientPhone.set('');
    this.clientEmail.set('');
    this.formTouched.set(false);
  }
}
