import { CommonModule } from '@angular/common';
import { Component, WritableSignal, Input, computed, Signal } from '@angular/core';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {

  @Input({ required: true }) name!: WritableSignal<string>;
  @Input({ required: true }) phone!: WritableSignal<string>;
  @Input({ required: true }) email!: WritableSignal<string>;
  @Input() formTouched!: WritableSignal<boolean>;
  @Input() isNameValid!: Signal<boolean>;
  @Input() isPhoneValid!: Signal<boolean>;
  @Input() isEmailValid!: Signal<boolean>;

  updateSignal(signal: WritableSignal<string>, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    signal.set(value);
  }

}
