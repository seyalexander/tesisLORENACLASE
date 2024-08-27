import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerNivelUsuariosPageComponent } from './primer-nivel-usuarios-page.component';

describe('PrimerNivelUsuariosPageComponent', () => {
  let component: PrimerNivelUsuariosPageComponent;
  let fixture: ComponentFixture<PrimerNivelUsuariosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimerNivelUsuariosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrimerNivelUsuariosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
