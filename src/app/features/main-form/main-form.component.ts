import { Component, signal } from '@angular/core';
import { CardComponent } from '../../shared/ui/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-form',
  standalone: true,
  imports: [CardComponent,CommonModule],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent {

  cards = signal([
    { title: 'Seo',
      subtitle: 'Mejora tu visibilidad en buscadores y atrae más clientes orgánicos',
      price: 300
    },
    {
      title: 'Ads',
      subtitle: 'Gestión de campañas en Google Ads para maximizar tus conversiones',
      price: 400
    },
    {
      title: 'Web',
      subtitle: 'Desarrollo de una web responsive optimizada para todos los dispositivos',
      price: 400
    }
  ]);
}
