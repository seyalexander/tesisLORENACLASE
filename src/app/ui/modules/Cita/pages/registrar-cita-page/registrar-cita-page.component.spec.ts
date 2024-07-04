import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCitaPageComponent } from './registrar-cita-page.component';

describe('RegistrarCitaPageComponent', () => {
  let component: RegistrarCitaPageComponent;
  let fixture: ComponentFixture<RegistrarCitaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarCitaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarCitaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
