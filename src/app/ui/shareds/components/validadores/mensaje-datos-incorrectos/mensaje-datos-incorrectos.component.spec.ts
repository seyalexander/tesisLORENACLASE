import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeDatosIncorrectosComponent } from './mensaje-datos-incorrectos.component';

describe('MensajeDatosIncorrectosComponent', () => {
  let component: MensajeDatosIncorrectosComponent;
  let fixture: ComponentFixture<MensajeDatosIncorrectosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MensajeDatosIncorrectosComponent]
});
    fixture = TestBed.createComponent(MensajeDatosIncorrectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
