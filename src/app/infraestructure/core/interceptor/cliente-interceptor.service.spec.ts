import { TestBed } from '@angular/core/testing';

import { ClienteInterceptorService } from './cliente-interceptor.service';

describe('ClienteInterceptorService', () => {
  let service: ClienteInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
