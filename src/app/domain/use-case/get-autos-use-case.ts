import { Inject, inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { autosGateway } from '../models/autos/gateway/autos-gateway';
import { autosModel } from '../models/autos/autos.model';



@Injectable({
  providedIn: 'root'
})

export class GetAutosUseCases {

  constructor( private _autosGateWay: autosGateway) {}

  getAllAutos () : Observable <Array<autosModel>> {
    return this._autosGateWay.getAllAutos();
  }

  newAuto (autos: autosModel) : Observable <object> {
    return this._autosGateWay.newAutos(autos);
  }

  getById (id: number): Observable <Array<autosModel>> {
    return this._autosGateWay.getById(id);
  }

  updateAutos (id_Autos: number, autos: autosModel) : Observable <object> {
    return this._autosGateWay.updatAuto(id_Autos, autos)
  }
}
