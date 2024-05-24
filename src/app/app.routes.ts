import { Routes } from '@angular/router';
import { ListaCitaPageComponent } from './ui/modules/Cita/lista-cita-page/lista-cita-page.component';
import { LoginComponent } from './ui/modules/auth/components/pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: ListaCitaPageComponent
  }
];
