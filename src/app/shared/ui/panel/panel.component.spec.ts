import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelComponent } from './panel.component';
import { ButtonComponent } from '../button/button.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PanelComponent, ButtonComponent]
    });

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    component.unitPrice = 30;
    fixture.detectChanges();
  });

  it('should emit the correct total price when increased', () => {
    spyOn(component.totalPanelPrice, 'emit');

    component.increase(); // número pasa de 1 a 2
    component.increase(); // número pasa de 2 a 3

    // (3 - 1) * 30 = 60
    expect(component.totalPanelPrice.emit).toHaveBeenCalledWith(60);
  });

  it('should not decrease below 1', () => {
    component.numberPanel = 1;
    component.decrease();
    expect(component.numberPanel).toBe(1);
  });
});
