import { autosModel } from "../autos/autos.model"
import { choferesModel } from "../choferes/choferes.model"

export class citasModel {
  id_Citas: number = 0
  fecha: string = ''
  hora: string = ''
  tipo_Consulta: string = ''
  descripcion: string = ''
  id_Auto_Fk: autosModel = {} as autosModel
  id_Chofer_Fk: choferesModel = {} as choferesModel
}
