import { Injectable } from "@angular/core";
import { citasGateway } from "../models/citas/gateway/citas-gateway";
import { citasModel } from "../models/citas/citas.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GetCitasUseCase {
  constructor( private _citasGateWay: citasGateway) {}

  getById (id: number): Observable <Array<citasModel>> {
    return this._citasGateWay.getById(id);
  }

  newCitas (citas: citasModel) : Observable <object> {
    return this._citasGateWay.newCita(citas);
  }

  getByIdUnique(id: number): Observable<citasModel>{
    return this._citasGateWay.getByIdUnique(id)
  }
}
