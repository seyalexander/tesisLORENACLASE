import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundoNivelUsuariosPageComponent } from './segundo-nivel-usuarios-page.component';

describe('SegundoNivelUsuariosPageComponent', () => {
  let component: SegundoNivelUsuariosPageComponent;
  let fixture: ComponentFixture<SegundoNivelUsuariosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegundoNivelUsuariosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SegundoNivelUsuariosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
