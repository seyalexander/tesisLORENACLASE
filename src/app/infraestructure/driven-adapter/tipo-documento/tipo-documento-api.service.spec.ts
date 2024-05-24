import { TestBed } from '@angular/core/testing';

import { TipoDocumentoApiService } from './tipo-documento-api.service';

describe('TipoDocumentoApiService', () => {
  let service: TipoDocumentoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDocumentoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
