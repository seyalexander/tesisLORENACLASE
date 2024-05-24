import { Inject, inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { modeloAutosGateway } from '../models/modelo-autos/gateway/modelo-autos-gateway';
import { modeloAutosModel } from '../models/modelo-autos/modelo-autos.model';



@Injectable({
  providedIn: 'root'
})

export class GetModeloAutosUseCases {

  constructor( private _modeloAutosGateWay: modeloAutosGateway) {}

  getAllModeloAutos () : Observable <Array<modeloAutosModel>> {
    return this._modeloAutosGateWay.getAllModelo();
  }

  newModeloAuto(marcaAutos: modeloAutosModel): Observable<Object> {
    return this._modeloAutosGateWay.newModeloAuto(marcaAutos)
  }

  getById(id: number): Observable<modeloAutosModel> {
    return this._modeloAutosGateWay.getById(id)
  }

  updateFamiliaProductos(id: number, autos: modeloAutosModel): Observable<Object> {
    return this._modeloAutosGateWay.updateModelo(id, autos)
  }
}
