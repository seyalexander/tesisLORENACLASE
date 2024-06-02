import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCitaPageComponent } from './lista-cita-page.component';

describe('ListaCitaPageComponent', () => {
  let component: ListaCitaPageComponent;
  let fixture: ComponentFixture<ListaCitaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCitaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaCitaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
