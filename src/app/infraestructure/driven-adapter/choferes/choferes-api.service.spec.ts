import { TestBed } from '@angular/core/testing';

import { ChoferesApiService } from './choferes-api.service';

describe('ChoferesApiService', () => {
  let service: ChoferesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoferesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
