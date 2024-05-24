import { Inject, inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { usuariosGateway } from '../models/usuario/gateway/usuario-gateway';
import { usuarioModel } from '../models/usuario/usuario.model';



@Injectable({
  providedIn: 'root'
})

export class GetUsuariosUseCases {

  constructor( private _usuariosGateWay: usuariosGateway) {}

  getAllUsuarios () : Observable <Array<usuarioModel>> {
    return this._usuariosGateWay.getAll();
  }

}
