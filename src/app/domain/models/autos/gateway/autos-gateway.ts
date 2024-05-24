import { Observable } from "rxjs";
import { autosModel } from "../autos.model";


export abstract class autosGateway {
  abstract getAllAutos(): Observable<Array<autosModel>>;
  abstract newAutos(autos: autosModel): Observable<Object>;
  abstract getById(id: number): Observable<Array<autosModel>>;
  abstract updatAuto(id_Auto: number, auto: autosModel): Observable<Object>;
}
