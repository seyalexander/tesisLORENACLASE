import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { clase4Model } from '../../../domain/models/clase4/clase4.model';
import { Clase4Gateway } from '../../../domain/models/clase4/gateway/clase4-gateway';
import { audioModel } from '../../../domain/models/audio/audio.model';

@Injectable({
  providedIn: 'root'
})
export class Clase4Service extends Clase4Gateway {

  private url = environment.api

  constructor(private http: HttpClient) { super();}

  override saveClase4(clase4: clase4Model): Observable<Object> {
    return this.http.post(`${this.url}/InsertarRespuestasClaseActividad3`, clase4)
  }

  override audios(): Observable<audioModel[]> {
    return this.http.get<audioModel[]>(`${this.url}/MostrarAudiosActividad3`)
  }

}
