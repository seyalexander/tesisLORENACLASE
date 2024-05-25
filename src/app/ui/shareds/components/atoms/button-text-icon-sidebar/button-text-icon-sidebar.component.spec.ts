import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTextIconSidebarComponent } from './button-text-icon-sidebar.component';

describe('ButtonTextIconSidebarComponent', () => {
  let component: ButtonTextIconSidebarComponent;
  let fixture: ComponentFixture<ButtonTextIconSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ButtonTextIconSidebarComponent]
});
    fixture = TestBed.createComponent(ButtonTextIconSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
