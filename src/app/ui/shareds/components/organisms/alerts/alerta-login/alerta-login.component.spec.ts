import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaLoginComponent } from './alerta-login.component';

describe('AlertaLoginComponent', () => {
  let component: AlertaLoginComponent;
  let fixture: ComponentFixture<AlertaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertaLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
