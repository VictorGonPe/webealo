import { Component, signal, computed, WritableSignal } from '@angular/core';
import { CardComponent } from '../../shared/ui/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-form',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent {

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
}
