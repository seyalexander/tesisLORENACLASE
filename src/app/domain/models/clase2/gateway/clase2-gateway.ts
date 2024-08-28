import { audioModel } from '../../audio/audio.model';
import { Observable } from "rxjs";
import { Clase2Model } from '../clase2.model';

export abstract class Clase2Gateway {
  abstract getAllClase2(): Observable<Clase2Model[]>;
}
