import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nivel4Component } from './nivel4.component';

describe('Nivel4Component', () => {
  let component: Nivel4Component;
  let fixture: ComponentFixture<Nivel4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nivel4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Nivel4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
