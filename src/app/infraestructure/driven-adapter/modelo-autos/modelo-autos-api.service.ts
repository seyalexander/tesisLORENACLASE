import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { modeloAutosGateway } from '../../../domain/models/modelo-autos/gateway/modelo-autos-gateway';
import { modeloAutosModel } from '../../../domain/models/modelo-autos/modelo-autos.model';

@Injectable({
  providedIn: 'root'
})
export class ModeloAutosApiService extends modeloAutosGateway{

  // override getAll(): Observable<modeloAutosModel[]> {
  //   const { data }: any = (dataRaw as any).default;
  //   return of(data);
  // }

  private URL = environment.api;

  override  getAllModelo(): Observable<modeloAutosModel[]> {
    return this.httpClient.get<modeloAutosModel[]>(`${this.URL}/MostrarModelo`)
  }

  override newModeloAuto(modeloAuto: modeloAutosModel): Observable<Object> {
    return this.httpClient.post(`${this.URL}/InsertarModelo`,modeloAuto)
  }

  override getById(id: number): Observable<modeloAutosModel> {
    return this.httpClient.get<modeloAutosModel>(`${this.URL}/BuscarModelo/${id}`)
  }

  override updateModelo(id_Modelo: number, modeloAuto: modeloAutosModel): Observable<Object> {
    return this.httpClient.put(`${this.URL}/ActualizarModelo/${id_Modelo}`, modeloAuto)
  }

  constructor(private httpClient: HttpClient) {
    super();
  }
}
