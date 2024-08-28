
import { audioModel } from '../../audio/audio.model';
import { clase4Model } from '../clase4.model';
import { Observable } from "rxjs";

export abstract class Clase4Gateway {
  // abstract getAllClase4(): Observable<clase4Model>;
  abstract saveClase4(clase4: clase4Model): Observable<Object>;
  abstract audios(): Observable<audioModel[]>
}
