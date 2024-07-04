import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { horasGateway } from '../models/horas/gateway/horas-gateway';
import { horasModel } from '../models/horas/horas.model';

@Injectable({
  providedIn: 'root'
})

export class GetHorasUseCases {

  constructor( private _horasGateWay: horasGateway) {}

  getAllHoras () : Observable <Array<horasModel>> {
    return this._horasGateWay.getAllHoras();
  }

}
