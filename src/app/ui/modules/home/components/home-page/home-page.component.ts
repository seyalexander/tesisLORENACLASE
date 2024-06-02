import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../../../infraestructure/driven-adapter/login/auth.service';


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
    standalone: true,
    imports: [ NgIf, RouterOutlet, RouterLink]
})
export class HomePageComponent {

  mainMenu: {
    defaultOptions: Array<any>;
    accessLink: Array<any>;
  } = {
    defaultOptions: [],
    accessLink: [],
  };

  constructor(private router: Router, private loginService: AuthService) {}

  showMenu:boolean = false;
  mostrarComponente(): void {
    this.showMenu = !this.showMenu;
  }

  ngOnInit(): void {

    this.mainMenu.defaultOptions = [
      {
        name: 'Citas',
        icon: 'uil uil-estate',
        route: ['/','home'],
      },
    ];

    this.mainMenu.accessLink = [
      {
        name: ['Autos'],
        icon: 'uil uil-document-info',
        route: ['/','home', 'autos'],
      },
    ]

  }

  salir () {
    this.loginService.logout()
  }


  @Output() abrirComponenteEvent = new EventEmitter<void>();

  abrirComponente(): void {
    this.abrirComponenteEvent.emit();
  }


  @Output() cerrarComponenteEvent = new EventEmitter<void>();
  cerrarComponente(): void {
    this.cerrarComponenteEvent.emit();
  }
}
