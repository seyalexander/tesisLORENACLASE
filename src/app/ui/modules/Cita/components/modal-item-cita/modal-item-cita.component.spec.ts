import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemCitaComponent } from './modal-item-cita.component';

describe('ModalItemCitaComponent', () => {
  let component: ModalItemCitaComponent;
  let fixture: ComponentFixture<ModalItemCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalItemCitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalItemCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
