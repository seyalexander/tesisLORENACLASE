import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleccionPersonakesPageComponent } from './eleccion-personakes-page.component';

describe('EleccionPersonakesPageComponent', () => {
  let component: EleccionPersonakesPageComponent;
  let fixture: ComponentFixture<EleccionPersonakesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EleccionPersonakesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EleccionPersonakesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
