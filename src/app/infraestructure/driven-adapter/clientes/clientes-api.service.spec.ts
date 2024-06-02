import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientesApiService } from './clientes-api.service';

describe('ClientesApiService', () => {
  let service: ClientesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ClientesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
