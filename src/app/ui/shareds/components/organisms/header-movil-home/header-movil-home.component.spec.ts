import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMovilHomeComponent } from './header-movil-home.component';

describe('HeaderMovilHomeComponent', () => {
  let component: HeaderMovilHomeComponent;
  let fixture: ComponentFixture<HeaderMovilHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HeaderMovilHomeComponent]
});
    fixture = TestBed.createComponent(HeaderMovilHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
