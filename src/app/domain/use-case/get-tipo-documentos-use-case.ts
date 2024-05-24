import { Inject, inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { tipoDocumentosModel } from '../models/tipo-documentos/tipo-documentos.model';
import { tipoDocumentoGateway } from '../models/tipo-documentos/gateway/tipo-documentos-gateway';



@Injectable({
  providedIn: 'root'
})

export class GetTipoDocumentoUseCases {

  constructor( private _tipoDocumentosGateWay: tipoDocumentoGateway) {}

  getAllTipoDocumento () : Observable <Array<tipoDocumentosModel>> {
    return this._tipoDocumentosGateWay.getAll();
  }

  newTipoDocumento (tipoDocumento: tipoDocumentosModel) : Observable <object> {
    return this._tipoDocumentosGateWay.newTipoDocumento(tipoDocumento);
  }

  getById (id: number) : Observable <tipoDocumentosModel> {
    return this._tipoDocumentosGateWay.getById(id);
  }

  updateTipoDocumento (id_TipoDocumento: number, tipoDocumento: tipoDocumentosModel) : Observable <object> {
    return this._tipoDocumentosGateWay.updateTipoDocumento(id_TipoDocumento, tipoDocumento)
  }

}
