import { Component, inject } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator'
import { GetAutosUseCases } from '../../../../domain/use-case/get-autos-use-case';
import { Subscription } from 'rxjs';
import { autosModel } from '../../../../domain/models/autos/autos.model';
import { AuthService } from '../../../../infraestructure/driven-adapter/login/auth.service';
@Component({
  selector: 'app-lista-cita-page',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './lista-cita-page.component.html',
  styleUrl: './lista-cita-page.component.css',
})
export class ListaCitaPageComponent {
  datosAutoslista: Array<autosModel> = [];
  listObservers$: Array<Subscription> = [];
  userNombre: String = ''
  userLoginOn : boolean = false;
  userLoginId : number = 0;
  private autoSubscription: Subscription | undefined;

  private _getAutosUseCase = inject(GetAutosUseCases);
  private loginService = inject(AuthService);

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
        if(this.userLoginOn) {
          this.loginService.currentUserIdClient.subscribe({
            next: (userLoginId) => {
              this.userLoginId = userLoginId
              this.listarAutos(this.userLoginId)
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
  // OBTENER OBJETO DEL LO SELECCIONADO Y ASIGNARLO A UNA VARIABLE
  //================================================================

  autosResponse: Array<autosModel> = [];

  listarAutos(idUsuario: number) {
    this.autoSubscription = this._getAutosUseCase
      .getById(idUsuario)
      .subscribe((Response: autosModel[]) => {
        console.log("LISTA AUTOS POR CLIENTE: ",Response);
        this.datosAutoslista = Response;
      });
  }

  //================================================================
  // DESTRUIR PETICIÓN
  //================================================================

  ngOnDestroy(): void {
    if (this.autoSubscription) {
      this.autoSubscription.unsubscribe();
    }
  }

}
