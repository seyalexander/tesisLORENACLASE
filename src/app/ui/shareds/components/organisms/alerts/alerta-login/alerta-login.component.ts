import { Component } from '@angular/core';

@Component({
  selector: 'app-alerta-login',
  standalone: true,
  imports: [],
  templateUrl: './alerta-login.component.html',
  styleUrl: './alerta-login.component.css'
})
export class AlertaLoginComponent {
  refrescar() {
    window.location.reload();
  }
}
