import { TestBed } from '@angular/core/testing';

import { Clase1Service } from './clase1.service';

describe('Clase1Service', () => {
  let service: Clase1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Clase1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
