import { TestBed } from '@angular/core/testing';

import { Clase4Service } from './clase4.service';

describe('Clase4Service', () => {
  let service: Clase4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Clase4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
