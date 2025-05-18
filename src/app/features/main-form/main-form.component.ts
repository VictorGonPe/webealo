import { Component, signal, computed, WritableSignal, inject } from '@angular/core';
import { CardComponent } from '../../shared/ui/card/card.component';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../../core/services/budget.service';
import { BudgetsListComponent } from "../budgets-list/budgets-list.component";
import { ClientFormComponent } from "../client-form/client-form.component";


@Component({
  selector: 'app-main-form',
  standalone: true,
  imports: [CardComponent, CommonModule, ClientFormComponent],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent {

  // Datos del cliente
  clientName: WritableSignal<string> = signal('');
  clientPhone: WritableSignal<string> = signal('');
  clientEmail: WritableSignal<string> = signal('');

  // Inyectar el servicio
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
  }
}
