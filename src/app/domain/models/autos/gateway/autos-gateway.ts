import { Observable } from "rxjs";
import { autosModel } from "../autos.model";


export abstract class autosGateway {
  abstract getAllAutos(): Observable<Array<autosModel>>;
  abstract getById(id: number): Observable<Array<autosModel>>;
}
