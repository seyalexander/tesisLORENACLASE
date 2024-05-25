import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonTextIconSidebarComponent } from '../../atoms/button-text-icon-sidebar/button-text-icon-sidebar.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-header-configuration',
    templateUrl: './header-configuration.component.html',
    styleUrls: ['./header-configuration.component.css'],
    standalone: true,
    imports: [NgFor, ButtonTextIconSidebarComponent, RouterLink]
})
export class HeaderConfigurationComponent {
  mainMenu: {
    accessLink: Array<any>;
  } = {
    accessLink: [],
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.mainMenu.accessLink = [
      {
        name: 'Básica',
        icon: 'uil uil-document-info',
        subOpciones: [
          {
            name_sub: 'Empresa',
            icon_sub: 'uil uil-document-info',
            route: ['/', 'home', 'empresa']
          },
          // {
          //   name_sub: 'Divisas',
          //   icon_sub: 'uil uil-document-info',
          //   route: ['/', 'empresas']
          // },
          // {
          //   name_sub: 'Impuestos',
          //   icon_sub: 'uil uil-document-info',
          //   route: ['/', 'empresas']
          // },
          // {
          //   name_sub: 'Medios de Pago',
          //   icon_sub: 'uil uil-document-info',
          //   route: ['/', 'empresas']
          // },
          {
            name_sub: 'Orden Ingreso',
            icon_sub: 'uil uil-document-info',
            route: ['/','home', 'configuracion', 'orden-trabajo']
          },
          {
            name_sub: 'Servicio realizado',
            icon_sub: 'uil uil-document-info',
            route: ['/','home', 'configuracion', 'reparacion']
          },
          {
            name_sub: 'Empleados',
            icon_sub: 'uil uil-document-info',
            route: ['/', 'home','configuracion', 'empleados']
          },
          {
            name_sub: 'Roles usuarios',
            icon_sub: 'uil uil-document-info',
            route: ['/','home','configuracion', 'rol-usuarios']
          },
          {
            name_sub: 'Usuarios',
            icon_sub: 'uil uil-document-info',
            route: ['/','home','configuracion', 'usuarios']
          },
        ],

      },
      {
        name: 'Productos',
        icon: 'uil uil-document-info',
        subOpciones: [
          {
            name_sub: 'Familia productos',
            icon_sub: 'uil uil-car',
            route: ['/','home','configuracion','familia-productos']
          },
          {
            name_sub: 'Productos',
            icon_sub: 'uil uil-car',
            route: ['/','home','configuracion','productos']
          },
        ],

      },
      {
        name: 'Autos',
        icon: 'uil uil-document-info',
        subOpciones: [
          {
            name_sub: 'Marca Autos',
            icon_sub: 'uil uil-car',
            route: ['/','home','configuracion','marca-autos']
          },
          {
            name_sub: 'Modelo Autos',
            icon_sub: 'uil uil-car',
            route: ['/','home','configuracion','modelo-autos']
          },
          {
            name_sub: 'Autos',
            icon_sub: 'uil uil-car',
            route: ['/','home','configuracion','autos']
          },

        ],

      },
      {
        name: 'Otros',
        icon: 'uil uil-document-info',
        subOpciones: [
          {
            name_sub: 'Clientes',
            icon_sub: 'uil uil-user',
            route: ['/','home','configuracion','MostrarCliente']
          },
          {
            name_sub: 'Tipo documentos',
            icon_sub: 'uil uil-user',
            route: ['/','home','configuracion','tipo-documentos']
          },
          {
            name_sub: 'Choferes',
            icon_sub: 'uil uil-user',
            route: ['/','home','choferes']
          },
        ],

      },
    ]
  }


  showMenuPrincipal: boolean = false;
  toggleModal(): void {
    this.showMenuPrincipal == !this.showMenuPrincipal;
  }


  @Output() cerrarComponenteEvent = new EventEmitter<void>();
  cerrarComponente(): void {
    this.cerrarComponenteEvent.emit();
  }
}
