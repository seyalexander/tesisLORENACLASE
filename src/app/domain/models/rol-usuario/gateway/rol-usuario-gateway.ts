import { Observable } from "rxjs";
import { rolUsuarioModel } from "../rol-usaurio.model";

export abstract class rolUsuarioGateway {
  abstract getAll(): Observable<Array<rolUsuarioModel>>;
  abstract newRol(productos: rolUsuarioModel): Observable<Object>;
  abstract getById(id: number): Observable<rolUsuarioModel>;
  abstract updateRol(id_Rol: number, rol: rolUsuarioModel): Observable<Object>;
}
