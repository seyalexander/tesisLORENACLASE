import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { citasGateway } from '../../../domain/models/citas/gateway/citas-gateway';
import { Observable } from 'rxjs';
import { citasModel } from '../../../domain/models/citas/citas.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CitasApiService extends citasGateway {

  private URL = environment.api;

  override getById(id: number): Observable<citasModel[]> {
    return this.httpClient.get<citasModel[]>(`${this.URL}/BuscarCitasPorCliente/${id}`)
  }

  override newCita(citas: citasModel): Observable<Object> {
    return this.httpClient.post(`${this.URL}/InsertarCitas`, citas)
  }

  override getByIdUnique(id: number): Observable<citasModel> {
    return this.httpClient.get<citasModel>(`${this.URL}/BuscarCitas/${id}`)
  }

  constructor(private httpClient: HttpClient) {
    super();
  }
}
