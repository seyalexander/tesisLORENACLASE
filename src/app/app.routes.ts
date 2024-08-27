import { Nivel4Component } from './ui/modules/configuration/cuartoNivel/pages/nivel4/nivel4.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './ui/modules/auth/components/pages/login/login.component';
import { HomePageComponent } from './ui/modules/home/components/home-page/home-page.component';
import { EleccionPersonakesPageComponent } from './ui/modules/configuration/personajes/pages/eleccion-personakes-page/eleccion-personakes-page.component';
import { OpcionesPagesComponent } from './ui/modules/configuration/opciones/pages/opciones-pages/opciones-pages.component';
import { CaminoJuegosPageComponent } from './ui/modules/configuration/caminoJuegos/page/camino-juegos-page/camino-juegos-page.component';
import { OpcionesClaseComponent } from './ui/modules/configuration/opcionesClase/page/opciones-clase/opciones-clase.component';
import { PrimerNivelUsuariosPageComponent } from './ui/modules/configuration/primerNivel/pages/primer-nivel-usuarios-page/primer-nivel-usuarios-page.component';


export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: OpcionesPagesComponent
      },
      {
        path: 'personajes',
        pathMatch: 'full',
        component: EleccionPersonakesPageComponent,
      },
      {
        path: 'mapa',
        pathMatch: 'full',
        component: CaminoJuegosPageComponent,
      },
      {
        path: 'opcionesClase',
        pathMatch: 'full',
        component: OpcionesClaseComponent,
      },
      {
        path: 'actividad1',
        pathMatch: 'full',
        component: PrimerNivelUsuariosPageComponent,
      },
      {
        path: 'actividad4',
        pathMatch: 'full',
        component: Nivel4Component,
      },
    ]

  }
];
