import { Component } from '@angular/core';
import { MainFormComponent } from "../../features/main-form/main-form.component";
import { BudgetsListComponent } from "../../features/budgets-list/budgets-list.component";
import { LogoComponent } from "../../shared/ui/logo/logo.component";
import { HeaderComponent } from "../../shared/layout/header/header.component";

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [MainFormComponent, BudgetsListComponent, LogoComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
