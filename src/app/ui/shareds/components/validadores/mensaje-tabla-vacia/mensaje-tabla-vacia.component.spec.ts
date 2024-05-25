import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeTablaVaciaComponent } from './mensaje-tabla-vacia.component';

describe('MensajeTablaVaciaComponent', () => {
  let component: MensajeTablaVaciaComponent;
  let fixture: ComponentFixture<MensajeTablaVaciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MensajeTablaVaciaComponent]
});
    fixture = TestBed.createComponent(MensajeTablaVaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
