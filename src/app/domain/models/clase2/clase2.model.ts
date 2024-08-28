import { alumnoModel } from "../alumno/alumno.model"

export class Clase2Model {
  idclaserespuestasctividad1: number = 0
  respuesta: string = ''
  escorrecta: boolean = false
  idalumnofk: alumnoModel = {} as alumnoModel
}
