import { clase4Model } from './../models/clase4/clase4.model';
import { Inject, inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Clase4Gateway } from '../models/clase4/gateway/clase4-gateway';
import { rolUsuarioModel } from '../models/rol-usuario/rol-usaurio.model';
import { audioModel } from '../models/audio/audio.model';



@Injectable({
  providedIn: 'root'
})

export class GetClase4UseCases {

  constructor( private _clase4GateWay: Clase4Gateway ) {}

  getAllRolUsuarios (clase4: clase4Model) : Observable <object> {
    return this._clase4GateWay.saveClase4(clase4);
  }

  audios(): Observable<audioModel[]> {
    return this._clase4GateWay.audios();
  }

}
