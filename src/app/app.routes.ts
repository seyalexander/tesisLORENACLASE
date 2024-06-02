import { Routes } from '@angular/router';
import { ListaCitaPageComponent } from './ui/modules/Cita/pages/lista-cita-page/lista-cita-page.component';
import { LoginComponent } from './ui/modules/auth/components/pages/login/login.component';
import { HomePageComponent } from './ui/modules/home/components/home-page/home-page.component';
import { ListaAutosComponent } from './ui/modules/Autos/pages/lista-autos/lista-autos.component';


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
      path:'',
      pathMatch: 'full',
      component: ListaCitaPageComponent,
    },
    {
      path:'autos',
      pathMatch: 'full',
      component: ListaAutosComponent,
    }
    ]

  }
];
