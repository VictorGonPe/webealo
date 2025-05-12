import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { TitleCardComponent } from '../title-card/title-card.component';

@Component({
  selector: 'app-card',
  standalone:true,
  imports: [TitleCardComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() price!:number;
}
