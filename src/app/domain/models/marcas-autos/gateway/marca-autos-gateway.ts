import { Observable } from "rxjs";
import { marcaAutosModel } from "../marca-autos.model";


export abstract class marcaAutosGateway {
  abstract getAllMarca(): Observable<Array<marcaAutosModel>>;
  abstract newMarcaAuto(marcaAutos: marcaAutosModel): Observable<Object>;
  abstract getById(id: number): Observable<marcaAutosModel>;
  abstract updateMarca(id_Marca: number, marcaAuto: marcaAutosModel): Observable<Object>;
}
