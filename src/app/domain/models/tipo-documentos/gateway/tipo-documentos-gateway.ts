import { Observable } from "rxjs";
import { tipoDocumentosModel } from "../tipo-documentos.model";

export abstract class tipoDocumentoGateway {
  abstract getAll(): Observable<Array<tipoDocumentosModel>>;
  abstract newTipoDocumento(tipoDocumento: tipoDocumentosModel): Observable<Object>;
  abstract getById(id: number): Observable<tipoDocumentosModel>;
  abstract updateTipoDocumento(id: number, tipoDocumento: tipoDocumentosModel): Observable<Object>;
}
