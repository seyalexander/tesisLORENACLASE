import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesClaseComponent } from './opciones-clase.component';

describe('OpcionesClaseComponent', () => {
  let component: OpcionesClaseComponent;
  let fixture: ComponentFixture<OpcionesClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionesClaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcionesClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
