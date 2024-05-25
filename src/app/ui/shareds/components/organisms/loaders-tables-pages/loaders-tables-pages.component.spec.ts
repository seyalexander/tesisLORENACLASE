import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadersTablesPagesComponent } from './loaders-tables-pages.component';

describe('LoadersTablesPagesComponent', () => {
  let component: LoadersTablesPagesComponent;
  let fixture: ComponentFixture<LoadersTablesPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [LoadersTablesPagesComponent]
});
    fixture = TestBed.createComponent(LoadersTablesPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
