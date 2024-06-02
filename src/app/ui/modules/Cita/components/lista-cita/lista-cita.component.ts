import { Router } from '@angular/router';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { autosModel } from '../../../../../domain/models/autos/autos.model';
import { citasModel } from '../../../../../domain/models/citas/citas.model';
import { Subscription } from 'rxjs';
import { GetAutosUseCases } from '../../../../../domain/use-case/get-autos-use-case';
import { GetCitasUseCase } from '../../../../../domain/use-case/get-citas-use-case';
import { AuthService } from '../../../../../infraestructure/driven-adapter/login/auth.service';
import { RegistrarCitaPageComponent } from '../registrar-cita-page/registrar-cita-page.component';


@Component({
  selector: 'app-lista-cita',
  standalone: true,
  imports: [RegistrarCitaPageComponent],
  templateUrl: './lista-cita.component.html',
  styleUrl: './lista-cita.component.css'
})
export class ListaCitaComponent {

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
  }




  //============================================================================
  // MOSTRAR MODAL DE REGISTRO
  //============================================================================

  showModalAuto: boolean = false
  mostrarModalAuto() {
    this.showModalAuto = !this.showModalAuto
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




  showRegistroCita: boolean = false
  @Output() cerrarComponenteEventCita = new EventEmitter<void>();
  mostrarComponenteCita(): void {
    this.showRegistro = !this.showRegistro;
    this.cerrarComponenteEventCita.emit();
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
