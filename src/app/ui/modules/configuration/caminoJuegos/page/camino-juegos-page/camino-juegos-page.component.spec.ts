import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaminoJuegosPageComponent } from './camino-juegos-page.component';

describe('CaminoJuegosPageComponent', () => {
  let component: CaminoJuegosPageComponent;
  let fixture: ComponentFixture<CaminoJuegosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaminoJuegosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaminoJuegosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
