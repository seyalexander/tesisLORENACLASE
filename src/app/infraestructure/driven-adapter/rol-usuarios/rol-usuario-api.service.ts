import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as dataRaw from '../../data/rol-usuario.json';
import { HttpClient } from '@angular/common/http';
import { rolUsuarioGateway } from '../../../domain/models/rol-usuario/gateway/rol-usuario-gateway';
import { rolUsuarioModel } from '../../../domain/models/rol-usuario/rol-usaurio.model';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class RolUsuarioApiService extends rolUsuarioGateway{

  override getAll(): Observable<rolUsuarioModel[]> {
    const { data }: any = (dataRaw as any).default;
     return of(data);
   }

  private URL = environment.api;

  // override getAll(): Observable<rolUsuarioModel[]> {
  //   return this.httpClient.get<rolUsuarioModel[]>(`${this.URL}/MostrarMarca`)
  // }

  override newRol(productos: rolUsuarioModel): Observable<Object> {
    return this.httpClient.post(`${this.URL}/InsertarProducto`,productos)
  }

  override getById(id: number): Observable<rolUsuarioModel> {
    return this.httpClient.get<rolUsuarioModel>(`${this.URL}/BuscarMarca/${id}`)
  }

  override updateRol(id_Rol: number, rol: rolUsuarioModel): Observable<Object> {
    return this.httpClient.put(`${this.URL}/ActualizarRol/${id_Rol}`, rol)
  }

   constructor(private httpClient: HttpClient) {
    super();
  }

}
