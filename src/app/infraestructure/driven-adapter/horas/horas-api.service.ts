import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { horasGateway } from '../../../domain/models/horas/gateway/horas-gateway';
import { Observable, of } from 'rxjs';
import { horasModel } from '../../../domain/models/horas/horas.model';
import { environment } from '../../../../environments/environment.development';
import  * as dataRaw from '../../data/horas-cita.json'

@Injectable({
  providedIn: 'root'
})
export class HorasApiService extends horasGateway{

  override getAllHoras(): Observable<Array<horasModel>> {
    const { data }: any = (dataRaw as any).default;
     return of(data);
  }

  constructor() { super() }
}
