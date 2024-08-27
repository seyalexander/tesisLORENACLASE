
import { clase4Model } from '../clase4.model';
import { Observable } from "rxjs";

export abstract class clase4Gateway {
  abstract getAllAudio(): Observable<clase4Model>;
  // abstract newTipoDocumento(tipoDocumento: tipoDocumentosModel): Observable<Object>;
  // abstract getById(id: number): Observable<tipoDocumentosModel>;
  // abstract updateTipoDocumento(id: number, tipoDocumento: tipoDocumentosModel): Observable<Object>;
}
