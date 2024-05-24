import { Observable } from "rxjs";
import { modeloAutosModel } from "../modelo-autos.model";


export abstract class modeloAutosGateway {
  abstract getAllModelo(): Observable<Array<modeloAutosModel>>;
  abstract newModeloAuto(modeloAuto: modeloAutosModel): Observable<Object>;
  abstract getById(id: number): Observable<modeloAutosModel>;
  abstract updateModelo(id_Modelo: number, modeloAuto: modeloAutosModel): Observable<Object>;
}
