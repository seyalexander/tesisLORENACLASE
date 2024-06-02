import { clienteModel } from "../clientes/clientes.model";
import { modeloAutosModel } from "../modelo-autos/modelo-autos.model";

export class autosModel {
  id_Auto: number = 0;
  matricula: String = '';
  idModeloFk: modeloAutosModel = {} as modeloAutosModel;
  idClienteFk: clienteModel = {} as clienteModel;

}
