import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from "./shared/ui/logo/logo.component";
import { HeaderComponent } from "./shared/layout/header/header.component";
import { MainFormComponent } from './features/main-form/main-form.component';
import { BudgetsListComponent } from "./features/budgets-list/budgets-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LogoComponent, HeaderComponent, MainFormComponent, BudgetsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'webealo';
}
