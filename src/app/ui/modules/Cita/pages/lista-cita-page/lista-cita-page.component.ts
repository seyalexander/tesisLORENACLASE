import { Component, EventEmitter, inject, Output } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator'
import { GetAutosUseCases } from '../../../../../domain/use-case/get-autos-use-case';
import { Subscription } from 'rxjs';
import { autosModel } from '../../../../../domain/models/autos/autos.model';
import { AuthService } from '../../../../../infraestructure/driven-adapter/login/auth.service';
import { citasModel } from '../../../../../domain/models/citas/citas.model';
import { GetCitasUseCase } from '../../../../../domain/use-case/get-citas-use-case';
import { Router, RouterModule } from '@angular/router';
import { RegistrarCitaPageComponent } from '../../components/registrar-cita-page/registrar-cita-page.component';
import { ModalItemCitaComponent } from '../../components/modal-item-cita/modal-item-cita.component';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-lista-cita-page',
  standalone: true,
  imports: [
    RegistrarCitaPageComponent,
    ModalItemCitaComponent
  ],
  templateUrl: './lista-cita-page.component.html',
  styleUrl: './lista-cita-page.component.css',
})
export class ListaCitaPageComponent {

  refresh_token = localStorage.getItem('jwt');

  datosAutoslista: Array<autosModel> = [];
  datosCitaslista: Array<citasModel> = [];

  listObservers$: Array<Subscription> = [];

  userNombre: String = ''
  userLoginOn : boolean = false;
  userLoginId : number = 0;
  userData : any = ""

  private autoSubscription: Subscription | undefined;
  private citaSubscription: Subscription | undefined;

  private _getAutosUseCase = inject(GetAutosUseCases);
  private _getCitasUseCase = inject(GetCitasUseCase);
  private loginService = inject(AuthService);


  constructor(private router:Router){}


  ngOnInit(): void {

    //================================================================
    // MOSTRAR AUTOS DE CLIENTES POR PERMISOS DE LOGIN (TOKEN)
    //================================================================
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
        if (this.userLoginOn) {
          this.loginService.currentUserIdClient.subscribe({
            next: (userLoginId) => {
              this.userLoginId = userLoginId;
              this.listarAutos(this.userLoginId);
              this.listarCitas(this.userLoginId);
            }
          });
          this.loginService.currentUserNombre.subscribe({
            next: (userNombre) => {
              this.userNombre = userNombre;
            }
          });
          this.loginService.currentUserData.subscribe({
            next: (userData: any) => {
              this.userData = userData;
            }
          });
        } else {
          this.userLoginId = 0;
          this.userNombre = '';
          this.userData = '';
          this.datosAutoslista = [];
          this.datosCitaslista = [];

        }
      }
    });


  }



  //================================================================
  // OBTENER LISTA DE AUTOS POR CLIENTE
  //================================================================

  autosResponse: Array<autosModel> = [];

  listarAutos(idUsuario: number) {
    this.autoSubscription = this._getAutosUseCase
      .getById(idUsuario)
      .subscribe((Response: autosModel[]) => {
        this.datosAutoslista = Response;
      });
  }

  //================================================================
  // OBTENER LISTA DE CITAS POR CLIENTE
  //================================================================

  citasResponse: Array<citasModel> = [];

  listarCitas(idUsuario: number) {
    this.citaSubscription = this._getCitasUseCase
      .getById(idUsuario)
      .subscribe((Response: citasModel[]) => {
        this.datosCitaslista = Response;
      });
  }

  //============================================================================
  // MOSTRAR MODAL DE REGISTRO
  //============================================================================

  showRegistro: boolean = false;
  mostrarComponente(): void {
    this.showRegistro = !this.showRegistro;
    console.log(this.showRegistro);
  }

   //============================================================================
  // MOSTRAR MODAL DE MODAL
  //============================================================================

  showModal: boolean = false;
  mostrarComponenteModal(): void {
    this.showModal = !this.showModal;
  }


  //============================================================================
  // CERRAR SESIÓN
  //============================================================================

  logout(): void {
    this.loginService.logout();
    this.userLoginOn = false;
    this.userLoginId = 0;
    this.userNombre = '';
    this.userData = '';
    this.router.navigateByUrl('/');
    console.log("Logged out, current user data:", {
      userLoginOn: this.userLoginOn,
      userLoginId: this.userLoginId,
      userNombre: this.userNombre,
      userData: this.userData
    });

  }

  //============================================================================
  // FUNCIÓN PARA MMANDAR LA INFORMACIÓN DEL ITEM SELECCIONADO
  //============================================================================

  @Output() btnBuscarMarcaId = new EventEmitter<number>();
  getById (id_Cita: any) {
    this.btnBuscarMarcaId.emit(id_Cita)
  }

  citaSeleccionada: citasModel = {} as citasModel;
  citaSeleccionado(idCita: number) {
    this._getCitasUseCase
      .getByIdUnique(idCita)
      .subscribe((Response: citasModel) => {
        this.citaSeleccionada = Response;
        this.showModal = true
      });
  }


  exportToPDF() {
    const doc = new jsPDF();

    // Establecer el título del documento
    doc.text('Detalle de Cita', 14, 16);

    // Definir las columnas
    const columns = [
      { title: 'Matrícula', dataKey: 'matricula' },
      { title: 'Fecha', dataKey: 'fecha' },
      { title: 'Hora', dataKey: 'hora' }
    ];

    // Datos a mostrar
    const data = [{
      matricula: this.citaSeleccionada.id_Auto_Fk.matricula,
      fecha: this.citaSeleccionada.fecha,
      hora: this.citaSeleccionada.hora
    }];

    // Generar la tabla
    autoTable(doc, {
      head: [columns.map(col => col.title)],
      body: data.map(item => [item.matricula.toString(), item.fecha, item.hora]),
      startY: 25, // Ajuste para no solaparse con el título
      styles: { // Estilos generales
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 4,
        textColor: [34, 34, 34],
        fillColor: [255, 255, 255],
        lineColor: [44, 62, 80],
        lineWidth: 0.2,
      },
      headStyles: { // Estilos de la cabecera
        fillColor: [52, 152, 219], // Azul claro
        textColor: [255, 255, 255], // Blanco
        fontSize: 12,
        fontStyle: 'bold',
        halign: 'center' // Alineación horizontal centrada
      },
      alternateRowStyles: { // Estilos de filas alternas
        fillColor: [245, 245, 245]
      },
      columnStyles: { // Estilos específicos por columna
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 'auto' }
      }
    });

    // Guardar el PDF o abrirlo en una nueva ventana
    doc.save('detalle_cita.pdf');
    // window.open(doc.output('bloburl'), '_blank');
  }

  exportToPDFTodos() {
    const doc = new jsPDF();

    // Establecer el título del documento
    doc.text('Lista de Citas', 14, 16);

    // Definir las columnas
    const columns = [
      { title: 'Matrícula', dataKey: 'matricula' },
      { title: 'Fecha', dataKey: 'fecha' },
      { title: 'Hora', dataKey: 'hora' },
      { title: 'Cliente', dataKey: 'cliente' } // Suponiendo que hay un campo para el cliente
    ];

    // Datos a mostrar
    const data = this.datosCitaslista.map(cita => ({
      matricula: cita.id_Auto_Fk.matricula,
      fecha: cita.fecha,
      hora: cita.hora,
      cliente: this.userNombre // o cualquier otra propiedad que contenga el nombre del cliente
    }));

    // Generar la tabla
    autoTable(doc, {
      head: [columns.map(col => col.title)],
      body: data.map(item => [item.matricula.toString(), item.fecha.toString(), item.hora.toString(), item.cliente.toString()]),
      startY: 25, // Ajuste para no solaparse con el título
      styles: { // Estilos generales
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 4,
        textColor: [34, 34, 34],
        fillColor: [255, 255, 255],
        lineColor: [44, 62, 80],
        lineWidth: 0.2,
      },
      headStyles: { // Estilos de la cabecera
        fillColor: [52, 152, 219], // Azul claro
        textColor: [255, 255, 255], // Blanco
        fontSize: 12,
        fontStyle: 'bold',
        halign: 'center' // Alineación horizontal centrada
      },
      alternateRowStyles: { // Estilos de filas alternas
        fillColor: [245, 245, 245]
      },
      columnStyles: { // Estilos específicos por columna
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 'auto' },
        3: { cellWidth: 'auto' } // Asegúrate de ajustar el número de columnas
      }
    });

    // Guardar el PDF
    doc.save('lista_citas.pdf');
  }



  //================================================================
  // DESTRUIR PETICIÓN
  //================================================================

  ngOnDestroy(): void {
    if (this.autoSubscription) {
      this.autoSubscription.unsubscribe();
    }
    if (this.citaSubscription) {
      this.citaSubscription.unsubscribe();
    }
  }

}
