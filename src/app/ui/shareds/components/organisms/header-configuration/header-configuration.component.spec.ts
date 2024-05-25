import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderConfigurationComponent } from './header-configuration.component';
import { ButtonTextIconSidebarComponent } from '../../atoms/button-text-icon-sidebar/button-text-icon-sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderConfigurationComponent', () => {
  let component: HeaderConfigurationComponent;
  let fixture: ComponentFixture<HeaderConfigurationComponent>;

  let componentButton: ButtonTextIconSidebarComponent;
  let fixtureButton: ComponentFixture<ButtonTextIconSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule, HeaderConfigurationComponent,
        ButtonTextIconSidebarComponent],
});

    fixture = TestBed.createComponent(HeaderConfigurationComponent);
    component = fixture.componentInstance;

    fixtureButton = TestBed.createComponent(ButtonTextIconSidebarComponent);
    componentButton = fixtureButton.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
