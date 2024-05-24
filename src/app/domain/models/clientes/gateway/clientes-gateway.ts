import { Observable } from "rxjs";
import { clienteModel } from "../clientes.model";


export abstract class clientesGateway {
  abstract getAll(): Observable<Array<clienteModel>>;
  abstract newCliente(cliente: clienteModel): Observable<Object>;
  abstract getById(id: number): Observable<clienteModel>;
  abstract updatClientes(id_Cliente: number, cliente: clienteModel): Observable<Object>;
}
