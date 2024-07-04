import { TestBed } from '@angular/core/testing';

import { HorasApiService } from './horas-api.service';

describe('HorasApiService', () => {
  let service: HorasApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorasApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
