import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { marcaAutosGateway } from '../../../domain/models/marcas-autos/gateway/marca-autos-gateway';
import { marcaAutosModel } from '../../../domain/models/marcas-autos/marca-autos.model';

@Injectable({
  providedIn: 'root'
})
export class MarcaAutosApiService extends marcaAutosGateway{

  // override getAll(): Observable<marcaAutosModel[]> {
  //   const { data }: any = (dataRaw as any).default;
  //   return of(data);
  // }

  private URL = environment.api;

  override getAllMarca(): Observable<marcaAutosModel[]> {
    return this.httpClient.get<marcaAutosModel[]>(`${this.URL}/MostrarMarca`)
  }

  override newMarcaAuto(marcaAutos: marcaAutosModel): Observable<Object> {
    return this.httpClient.post(`${this.URL}/InsertarMarca`,marcaAutos)
  }

  override updateMarca(id_Marca: number, marcaAuto: marcaAutosModel ): Observable<Object> {
    return this.httpClient.put(`${this.URL}/ActualizarMarca/${id_Marca}`, marcaAuto)
  }

  override getById( id_Marca: number ): Observable<marcaAutosModel> {
    return this.httpClient.get<marcaAutosModel>(`${this.URL}/BuscarMarca/${id_Marca}`)
  }

  constructor(private httpClient: HttpClient) {
    super();
  }

}
