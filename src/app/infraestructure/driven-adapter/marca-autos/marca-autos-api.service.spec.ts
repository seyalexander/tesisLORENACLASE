import { TestBed } from '@angular/core/testing';

import { MarcaAutosApiService } from './marca-autos-api.service';

describe('MarcaAutosApiService', () => {
  let service: MarcaAutosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcaAutosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
