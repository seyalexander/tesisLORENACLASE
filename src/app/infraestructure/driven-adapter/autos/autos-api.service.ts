import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { autosGateway } from '../../../domain/models/autos/gateway/autos-gateway';
import { environment } from '../../../../environments/environment.development';
import { autosModel } from '../../../domain/models/autos/autos.model';

@Injectable({
  providedIn: 'root'
})
export class AutosApiService extends autosGateway{

  // override getAllAutos(): Observable<autosModel[]> {
  //   const { data }: any = (dataRaw as any).default;
  //   return of(data);
  // }

  private URL = environment.api;

  override getAllAutos(): Observable<autosModel[]> {
    return this.httpClient.get<autosModel[]>(`${this.URL}/MostrarAuto`)
  }

  override newAutos(autos: autosModel): Observable<Object> {
    return this.httpClient.post(`${this.URL}/InsertarAuto`, autos)
  }

  override getById(id: number): Observable<autosModel[]> {
    return this.httpClient.get<autosModel[]>(`${this.URL}/buscarAutoPorCliente/${id}`)
  }

  override updatAuto(id_Auto: number, auto: autosModel): Observable<Object> {
    return this.httpClient.put(`${this.URL}/ActualizarAuto/${id_Auto}`, auto)
  }

  constructor(private httpClient: HttpClient) {
    super();
  }
}
