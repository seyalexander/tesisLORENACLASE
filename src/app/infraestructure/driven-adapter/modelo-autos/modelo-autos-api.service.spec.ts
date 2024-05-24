import { TestBed } from '@angular/core/testing';

import { ModeloAutosApiService } from './modelo-autos-api.service';

describe('ModeloAutosApiService', () => {
  let service: ModeloAutosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeloAutosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
