import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { GetAutosUseCases } from '../../../../../domain/use-case/get-autos-use-case';
import { MensajeDatosIncorrectosComponent } from '../../../../shareds/components/validadores/mensaje-datos-incorrectos/mensaje-datos-incorrectos.component';
import { GetCitasUseCase } from '../../../../../domain/use-case/get-citas-use-case';
import { GetChoferesUseCases } from '../../../../../domain/use-case/get-choferes-use-case';
import { AuthService } from '../../../../../infraestructure/driven-adapter/login/auth.service';
import { citasModel } from '../../../../../domain/models/citas/citas.model';
import { autosModel } from '../../../../../domain/models/autos/autos.model';
import { choferesModel } from '../../../../../domain/models/choferes/choferes.model';


@Component({
  selector: 'app-registrar-cita-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, MensajeDatosIncorrectosComponent, CommonModule],
  templateUrl: './registrar-cita-page.component.html',
  styleUrl: './registrar-cita-page.component.css'
})
export class RegistrarCitaPageComponent {

  refresh_token: string = '';
  userNombre: String = ''
  userLoginOn : boolean = false;
  userLoginId : number = 0;

//============================================================================
  // OCULTAR MODAL DESDE LA PANTALLA DE REGISTRO
  //============================================================================
  @Output() cerrarComponenteEvent = new EventEmitter<void>();
  cerrarComponente(): void {
    this.showRegistro = false;
    this.cerrarComponenteEvent.emit();
  }

  showRegistro: boolean = false;
  mostrarComponente(): void {
    this.showRegistro = !this.showRegistro;
  }

  //============================================================================
  // INYECCION DE SERVICIOS DESDE LOS CASOS DE USO
  //============================================================================
  constructor(
    private _getAutoUseCase: GetAutosUseCases,
    private _postCitasUseCase: GetCitasUseCase,
    private _tokenLogin: AuthService,
    private _getChoferesUseCase: GetChoferesUseCases,
    private loginService: AuthService
  ) { }

  cita: citasModel = new citasModel();
  formularioRegistro: FormGroup = new FormGroup({});

  //============================================================================
  // FUNCIÓN PRINCIPAL
  //============================================================================

  ngOnInit(): void {

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
        if(this.userLoginOn) {
          this.loginService.currentUserIdClient.subscribe({
            next: (userLoginId) => {
              this.userLoginId = userLoginId
              if(this.userLoginId > 0 || this.userLoginId != null) {
                this.listarCitas(this.userLoginId)
              }

            }
          })
          this.loginService.currentUserNombre.subscribe({
            next: (userNombre) => {
              this.userNombre = userNombre
            }
          })
        }
      }
    })

    this.obtenerChoferesExito()

    this.formularioRegistro = new FormGroup({
      tipo_Consulta: new FormControl('', [
        Validators.required,
      ]),
      descripcion: new FormControl('', [
        Validators.required,
      ]),
      id_Auto_Fk: new FormControl('', []),
      id_Chofer_Fk: new FormControl('', []),
      fecha: new FormControl('', []),
      hora: new FormControl('', []),
    });

   this._tokenLogin.currentUserData.subscribe({
    next:(token) => {
      this.refresh_token = token.toString()
    }
   })
  }

  //============================================================================
  // MOSTRAR LISTADO AUTOS - DESPLEGABLE
  //============================================================================

  citasResponse: Array<citasModel> = [];
  private citaSubscription: Subscription | undefined;
  listarCitas(idUsuario: number) {
    this.citaSubscription = this._postCitasUseCase
      .getById(idUsuario)
      .subscribe((Response: citasModel[]) => {
        this.citasResponse = Response;
      });
  }

  //================================================================
  // OBTENER AUTO POR ID
  //================================================================
  datosAutoslista: Array<autosModel> = [];
  private autoSubscription: Subscription | undefined;

  //============================================================================
  // MOSTRAR LISTADO MODELO AUTOS - DESPLEGABLE
  //============================================================================

  datosChofereslista: Array<choferesModel> = [];
  private choferesSubscription: Subscription | undefined;

  obtenerChoferesExito(): void {
    this.choferesSubscription = this._getChoferesUseCase
    .getAllChoferes()
    .subscribe((Response: choferesModel[]) => {
        this.datosChofereslista = Response;
      })
  }

  //============================================================================
  // GUARDAR LO REGISTRADO
  //============================================================================

  public sendCita(): void {

    const formValue = this.cita;
    const horaValue = this.cita.hora;
    const horaConSegundos = horaValue.length === 5 ? horaValue + ':00' : horaValue;
    formValue.hora = horaConSegundos;  // Renombrar Hora a fora
    this._postCitasUseCase
      .newCitas(formValue)  // Enviar formValue en lugar de this.cita
      .subscribe((response: any) => {
        this.cerrarComponente();
        this.mensajeValidacionRegistroCorrecto(response);
      });
  }

  //============================================================================
  // SWEETALERT
  //============================================================================

  tituloSwalCorrecto: String = 'CONFIRMACIÓN';
  mensajeValidacionRegistroCorrecto(response: any) {
    const message = response && response.message ? response.message : 'Cita creada correctamente.';
    Swal.fire(`${this.tituloSwalCorrecto}`, message, 'success').then(() => {
      this.regresarListaTipoDocumento();
    });
  }


  //============================================================================
  // RECARGAR PÁGINA
  //============================================================================

  regresarListaTipoDocumento() {
    window.location.reload();
    return this.refresh_token
  }

  //============================================================================
  // DESTRCUCCIÓN DEL CARGADO DE DATOS
  //============================================================================

  ngOnDestroy(): void {
    if (this.citaSubscription) {
      this.citaSubscription.unsubscribe();
    }
    if (this.choferesSubscription) {
      this.choferesSubscription.unsubscribe();
    }
  }

  showRegistroCita: boolean = false
  @Output() cerrarComponenteEventCita = new EventEmitter<void>();
  cerrarComponenteCita(): void {
    this.showRegistro = false;
    this.cerrarComponenteEvent.emit();
  }


}
