import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarClase2Component } from './listar-clase2.component';

describe('ListarClase2Component', () => {
  let component: ListarClase2Component;
  let fixture: ComponentFixture<ListarClase2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarClase2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarClase2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
