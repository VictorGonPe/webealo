import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone:true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() price!: number;
  @Input() selected: boolean = false;

  @Output() selectedChange = new EventEmitter<string>();

  onCheckboxChange() {
    this.selectedChange.emit(this.title);
  }
}
