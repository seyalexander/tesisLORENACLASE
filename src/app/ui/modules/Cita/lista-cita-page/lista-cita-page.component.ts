import { Component, inject } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator'
import { GetAutosUseCases } from '../../../../domain/use-case/get-autos-use-case';
import { Subscription } from 'rxjs';
import { autosModel } from '../../../../domain/models/autos/autos.model';
import { AuthService } from '../../../../infraestructure/driven-adapter/login/auth.service';
import { citasModel } from '../../../../domain/models/citas/citas.model';
import { GetCitasUseCase } from '../../../../domain/use-case/get-citas-use-case';
import { RegistrarCitaPageComponent } from '../registrar-cita-page/registrar-cita-page.component';
@Component({
  selector: 'app-lista-cita-page',
  standalone: true,
  imports: [MatPaginatorModule, RegistrarCitaPageComponent],
  templateUrl: './lista-cita-page.component.html',
  styleUrl: './lista-cita-page.component.css',
})
export class ListaCitaPageComponent {

  datosAutoslista: Array<autosModel> = [];
  datosCitaslista: Array<citasModel> = [];

  listObservers$: Array<Subscription> = [];

  userNombre: String = ''
  userLoginOn : boolean = false;
  userLoginId : number = 0;

  private autoSubscription: Subscription | undefined;
  private citaSubscription: Subscription | undefined;

  private _getAutosUseCase = inject(GetAutosUseCases);
  private _getCitasUseCase = inject(GetCitasUseCase);
  private loginService = inject(AuthService);

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
              this.userLoginId = userLoginId
              this.listarAutos(this.userLoginId)
              this.listarCitas(this.userLoginId)
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
