import { TestBed } from '@angular/core/testing';

import { RolUsuarioApiService } from './rol-usuario-api.service';

describe('RolUsuarioApiService', () => {
  let service: RolUsuarioApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolUsuarioApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
