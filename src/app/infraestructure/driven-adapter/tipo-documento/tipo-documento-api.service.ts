import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tipoDocumentosModel } from '../../../domain/models/tipo-documentos/tipo-documentos.model';
import { environment } from '../../../../environments/environment.development';
import { tipoDocumentoGateway } from '../../../domain/models/tipo-documentos/gateway/tipo-documentos-gateway';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoApiService extends tipoDocumentoGateway{

  // override getAll(): Observable<tipoDocumentosModel[]> {
  //  const { data }: any = (dataRaw as any).default;
  //   return of(data);
  // }

  private URL = environment.api;
  override getAll(): Observable<tipoDocumentosModel[]> {
    return this.httpClient.get<tipoDocumentosModel[]>(`${this.URL}/MostrarTipoDocumento`)
   }

  override newTipoDocumento(tipoDocumento: tipoDocumentosModel): Observable<Object> {
    return this.httpClient.post(`${this.URL}/InsertarTipoDocumento`, tipoDocumento)
  }

  override getById(id_TipoDocumento: number): Observable<tipoDocumentosModel> {
    return this.httpClient.get<tipoDocumentosModel>(`${this.URL}/BuscarTipoDocumento/${id_TipoDocumento}`)
  }

  override updateTipoDocumento(id_TipoDocumento: number, tipoDocumento: tipoDocumentosModel): Observable<Object> {
    return this.httpClient.put(`${this.URL}/ActualizarTipoDocumento/${id_TipoDocumento}`, tipoDocumento)
  }

  constructor(private httpClient: HttpClient) {
    super();
  }
}
