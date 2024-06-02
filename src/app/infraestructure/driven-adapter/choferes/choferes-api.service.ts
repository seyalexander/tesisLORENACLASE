
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { choferesGateway } from '../../../domain/models/choferes/gateway/choferes-gateway';
import { choferesModel } from '../../../domain/models/choferes/choferes.model';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ChoferesApiService extends choferesGateway{
  private URL = environment.api;

  override getAllChoferes(): Observable<choferesModel[]> {
    return this.httpClient.get<choferesModel[]>(`${this.URL}/MostrarChofer`)
  }

  constructor(private httpClient: HttpClient) {
    super();
  }
}
