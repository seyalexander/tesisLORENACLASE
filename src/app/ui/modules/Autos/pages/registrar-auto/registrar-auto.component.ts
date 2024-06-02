import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { MensajeDatosIncorrectosComponent } from '../../../../shareds/components/validadores/mensaje-datos-incorrectos/mensaje-datos-incorrectos.component';
import { GetAutosUseCases } from '../../../../../domain/use-case/get-autos-use-case';
import { GetModeloAutosUseCases } from '../../../../../domain/use-case/get-modelo-autos-use-case';
import { GetClientesUseCases } from '../../../../../domain/use-case/get-clientes-use-case';
import { AuthService } from '../../../../../infraestructure/driven-adapter/login/auth.service';
import { autosModel } from '../../../../../domain/models/autos/autos.model';
import { modeloAutosModel } from '../../../../../domain/models/modelo-autos/modelo-autos.model';
import { clienteModel } from '../../../../../domain/models/clientes/clientes.model';

@Component({
  selector: 'app-registrar-auto',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MensajeDatosIncorrectosComponent,
    CommonModule
  ],
  templateUrl: './registrar-auto.component.html',
  styleUrl: './registrar-auto.component.css'
})
export class RegistrarAutoComponent {

  userNombre: String = ''
  userLoginOn : boolean = false;
  userLoginId : number = 0;
  userData : any = ""


  //============================================================================
  // OCULTAR MODAL DESDE LA PANTALLA DE REGISTRO
  //============================================================================
  @Output() cerrarComponenteEvent = new EventEmitter<void>();
  cerrarComponenteAuto(): void {
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
    private _postAutoUseCase: GetAutosUseCases,
    private _getModeloAutoUseCase: GetModeloAutosUseCases,
    private _getClienteUseCase: GetClientesUseCases,
    private loginService: AuthService
  ) { }

  Auto: autosModel = new autosModel();
  formularioRegistro: FormGroup = new FormGroup({});

  //============================================================================
  // FUNCIÓN PRINCIPAL
  //============================================================================

  ngOnInit(): void {


    //================================================================
    // MOSTRAR AUTOS DE CLIENTES POR PERMISOS DE LOGIN (TOKEN)
    //================================================================
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;

        if(this.userLoginOn) {
          this.loginService.currentUserIdClient.subscribe({
            next: (userLoginId) => {
              console.log(userLoginId);
              this.userLoginId = userLoginId
            }
          })
        }
      }
    })




    this.obtenerModeloAutosExito()
    this.obtenerClientesExito()

    this.formularioRegistro = new FormGroup({
      Auto: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      AutoDb: new FormControl('', []),
      AutoDbC: new FormControl('', [])
    });
  }

  //============================================================================
  // MOSTRAR LISTADO MODELO AUTOS - DESPLEGABLE
  //============================================================================

  datosModeloAutoslista: Array<modeloAutosModel> = [];
  private modeloAutoSubscription: Subscription | undefined;

  obtenerModeloAutosExito(): void {
    this.modeloAutoSubscription = this._getModeloAutoUseCase.getAllModeloAutos().
      subscribe((Response: modeloAutosModel[]) => {
        this.datosModeloAutoslista = Response;
      })
  }

  //============================================================================
  // MOSTRAR LISTADO CLIENTES - DESPLEGABLE
  //============================================================================

  datosClienteslista: Array<clienteModel> = [];
  private clienteSubscription: Subscription | undefined;

  obtenerClientesExito(): void {
    this.clienteSubscription = this._getClienteUseCase.getAllClientes().
      subscribe((Response: clienteModel[]) => {
        this.datosClienteslista = Response;
      })
  }

  //============================================================================
  // GUARDAR LO REGISTRADO
  //============================================================================

  public sendModeloAuto(): void {
    const formValue = this.Auto
    this.Auto.idClienteFk.id_Cliente = this.userLoginId
    console.log(this.Auto.idClienteFk.id_Cliente);

    formValue.idClienteFk.id_Cliente = this.Auto.idClienteFk.id_Cliente
    this._postAutoUseCase
      .newAuto(this.Auto)
      .subscribe((response: any) => {
        this.cerrarComponenteAuto()
        this.mensajeValidacionRegistroCorrecto(response)
      });
  }

  //============================================================================
  // SWEETALERT
  //============================================================================

  tituloSwalCorrecto: String = 'CONFIRMACIÓN';
  mensajeValidacionRegistroCorrecto(response: any) {
    const message = response && response.message ? response.message : 'Auto creado correctamente.';
    Swal.fire(`${this.tituloSwalCorrecto}`, message, 'success').then(() => {
      this.regresarListaTipoDocumento();
    });
  }

  //============================================================================
  // RECARGAR PÁGINA
  //============================================================================

  regresarListaTipoDocumento() {
    window.location.reload();
  }

  //============================================================================
  // DESTRCUCCIÓN DEL CARGADO DE DATOS
  //============================================================================

  ngOnDestroy(): void {
    if (this.modeloAutoSubscription) {
      this.modeloAutoSubscription.unsubscribe();
    }
    if (this.clienteSubscription) {
      this.clienteSubscription.unsubscribe();
    }
  }
}
