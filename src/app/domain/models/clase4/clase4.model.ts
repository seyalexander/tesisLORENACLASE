import { alumnoModel } from "../alumno/alumno.model"
import { audioModel } from "../audio/audio.model"

export class clase4Model {
  idclaserespuestasctividad3: number = 0
  imagen: string = ''
  idalumnofk:  alumnoModel = {} as alumnoModel
  idaudiosactividad3fk: audioModel = {} as audioModel

  constructor(imagen: string) {
    this.imagen = imagen;
  }
}
