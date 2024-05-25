import { tipoDocumentosModel } from "../tipo-documentos/tipo-documentos.model"

export class choferesModel {
  nombres: string = ''
  apellidos: string = ''
  numero_Documento: string = ''
  telefono: string = ''
  id_Chofer: number = 0
  id_Tipo_Documento_Fk: tipoDocumentosModel = {} as tipoDocumentosModel
}
