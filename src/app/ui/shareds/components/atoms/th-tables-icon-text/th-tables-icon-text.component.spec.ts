import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThTablesIconTextComponent } from './th-tables-icon-text.component';

describe('ThTablesIconTextComponent', () => {
  let component: ThTablesIconTextComponent;
  let fixture: ComponentFixture<ThTablesIconTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ThTablesIconTextComponent]
});
    fixture = TestBed.createComponent(ThTablesIconTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
