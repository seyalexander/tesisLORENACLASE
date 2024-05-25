import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-mensaje-tabla-vacia',
    templateUrl: './mensaje-tabla-vacia.component.html',
    styleUrls: ['./mensaje-tabla-vacia.component.css'],
    standalone: true
})
export class MensajeTablaVaciaComponent {
  @Input() nombrePagina:  String = '';
}
