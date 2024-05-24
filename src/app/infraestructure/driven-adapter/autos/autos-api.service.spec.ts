import { TestBed } from '@angular/core/testing';
import { AutosApiService } from './autos-api.service';
import { autosGateway } from 'src/app/domain/models/autos/gateway/autos-gateway';

describe('AutosApiService', () => {
  let service: AutosApiService;
  let autosGatewayStub: Partial<autosGateway>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        AutosApiService,
        { provide: autosGateway, useValue: autosGatewayStub },
      ],
    });

    service = TestBed.inject(AutosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
