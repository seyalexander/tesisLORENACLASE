import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MensajeDatosIncorrectosComponent } from '../../../shareds/components/validadores/mensaje-datos-incorrectos/mensaje-datos-incorrectos.component';
import { GetAutosUseCases } from '../../../../domain/use-case/get-autos-use-case';
import { GetModeloAutosUseCases } from '../../../../domain/use-case/get-modelo-autos-use-case';
import { GetClientesUseCases } from '../../../../domain/use-case/get-clientes-use-case';
import { autosModel } from '../../../../domain/models/autos/autos.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { GetCitasUseCase } from '../../../../domain/use-case/get-citas-use-case';
import { citasModel } from '../../../../domain/models/citas/citas.model';

@Component({
  selector: 'app-registrar-cita-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, MensajeDatosIncorrectosComponent, CommonModule],
  templateUrl: './registrar-cita-page.component.html',
  styleUrl: './registrar-cita-page.component.css'
})
export class RegistrarCitaPageComponent {
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
    private _postCitasUseCase: GetCitasUseCase
  ) { }

  cita: citasModel = new citasModel();
  formularioRegistro: FormGroup = new FormGroup({});

  //============================================================================
  // FUNCIÓN PRINCIPAL
  //============================================================================

  ngOnInit(): void {

    this.obtenerModeloAutosExito()


    this.formularioRegistro = new FormGroup({
      Cita: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      Auto: new FormControl('', []),
      AutoDbC: new FormControl('', [])
    });
  }

  //============================================================================
  // MOSTRAR LISTADO AUTOS - DESPLEGABLE
  //============================================================================

  datosAutoslista: Array<autosModel> = [];
  private autoSubscription: Subscription | undefined;

  obtenerModeloAutosExito(): void {
    this.autoSubscription = this._getAutoUseCase.getAllAutos().
      subscribe((Response: autosModel[]) => {
        this.datosAutoslista = Response;
      })
  }

  //============================================================================
  // GUARDAR LO REGISTRADO
  //============================================================================

  public sendModeloAuto(): void {
    this._postCitasUseCase
      .newCitas(this.cita)
      .subscribe((response: any) => {
        this.cerrarComponente()
        this.mensajeValidacionRegistroCorrecto(response)
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
  }

  //============================================================================
  // DESTRCUCCIÓN DEL CARGADO DE DATOS
  //============================================================================

  ngOnDestroy(): void {
    if (this.autoSubscription) {
      this.autoSubscription.unsubscribe();
    }
  }
}
