import { Component, EventEmitter, inject, Output } from '@angular/core';
import { autosModel } from '../../../../../domain/models/autos/autos.model';
import { GetAutosUseCases } from '../../../../../domain/use-case/get-autos-use-case';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../../infraestructure/driven-adapter/login/auth.service';
import { Router } from '@angular/router';
import { ModalAutosComponent } from '../../components/modal-autos/modal-autos.component';
import { RegistrarAutoComponent } from '../registrar-auto/registrar-auto.component';


@Component({
  selector: 'app-lista-autos',
  standalone: true,
  imports: [
    ModalAutosComponent,
    RegistrarAutoComponent,
    ModalAutosComponent,
  ],
  templateUrl: './lista-autos.component.html',
  styleUrl: './lista-autos.component.css'
})
export class ListaAutosComponent {

  datosAutoslista: Array<autosModel> = [];
  private autoSubscription: Subscription | undefined;
  private _getAutosUseCase = inject(GetAutosUseCases);
  private loginService = inject(AuthService);
  constructor(private router:Router){}

  userNombre: String = ''
  userLoginOn : boolean = false;
  userLoginId : number = 0;
  userData : any = ""



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



  ngOnDestroy(): void {
    if (this.autoSubscription) {
      this.autoSubscription.unsubscribe();
    }
  }
}
