import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

}
