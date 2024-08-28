import { TestBed } from '@angular/core/testing';

import { Clase2Service } from './clase2.service';

describe('Clase2Service', () => {
  let service: Clase2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Clase2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
