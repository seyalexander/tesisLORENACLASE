import { Observable } from "rxjs";
import { alumnoModel } from "../alumno.model";

export abstract class alumnoGateway {
  abstract getAllAudio(): Observable<alumnoModel>;
}
