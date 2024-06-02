import { Injectable } from "@angular/core";
import { choferesGateway } from "../models/choferes/gateway/choferes-gateway";
import { choferesModel } from "../models/choferes/choferes.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GetChoferesUseCases {

  constructor( private _choferesGateWay: choferesGateway) {}

  getAllChoferes () : Observable <Array<choferesModel>> {
    return this._choferesGateWay.getAllChoferes();
  }

}
