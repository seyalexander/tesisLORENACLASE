import { Inject, inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { rolUsuarioGateway } from '../models/rol-usuario/gateway/rol-usuario-gateway';
import { rolUsuarioModel } from '../models/rol-usuario/rol-usaurio.model';



@Injectable({
  providedIn: 'root'
})

export class GetRolUsuarioUseCases {

  constructor( private _rolUsuarioGateWay: rolUsuarioGateway) {}

  getAllRolUsuarios () : Observable <Array<rolUsuarioModel>> {
    return this._rolUsuarioGateWay.getAll();
  }

  newRolUsuarios(roles: rolUsuarioModel): Observable<Object> {
    return this._rolUsuarioGateWay.newRol(roles)
  }

  getById(id: number): Observable<rolUsuarioModel> {
    return this._rolUsuarioGateWay.getById(id)
  }

  updateProductos(id: number, roles: rolUsuarioModel): Observable<Object> {
    return this._rolUsuarioGateWay.updateRol(id, roles)
  }

}
