import { Observable } from "rxjs";
import { horasModel } from "../horas.model";

export abstract class horasGateway {
  abstract getAllHoras(): Observable<Array<horasModel>>;
}
