import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../../../../../infraestructure/driven-adapter/login/auth.service';

@Component({
  selector: 'app-opciones-pages',
  standalone: true,
  imports: [],
  templateUrl: './opciones-pages.component.html',
  styleUrl: './opciones-pages.component.css'
})
export class OpcionesPagesComponent {
  username: string = 'Almendra'
  constructor(
    private router: Router,
    private _login: AuthService
  ){}

  aventuras(): void {
    this.router.navigateByUrl('/home/personajes');
  }

  volverHome(): void {
    this.router.navigateByUrl('/home');
  }

  salir() {
    this._login.logout()
  }

  opcionesClase(): void {
    this.router.navigateByUrl('/home/opcionesClase');
  }
}
