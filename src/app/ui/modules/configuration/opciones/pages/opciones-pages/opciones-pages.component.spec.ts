import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesPagesComponent } from './opciones-pages.component';

describe('OpcionesPagesComponent', () => {
  let component: OpcionesPagesComponent;
  let fixture: ComponentFixture<OpcionesPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionesPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcionesPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
