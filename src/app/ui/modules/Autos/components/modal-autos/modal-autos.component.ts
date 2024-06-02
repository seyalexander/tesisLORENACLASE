import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-autos',
  standalone: true,
  imports: [],
  templateUrl: './modal-autos.component.html',
  styleUrl: './modal-autos.component.css'
})
export class ModalAutosComponent {

  //============================================================================
  // OCULTAR MODAL DESDE LA PANTALLA DE REGISTRO
  //============================================================================
  showRegistro: boolean = false
  @Output() cerrarComponenteEvent = new EventEmitter<void>();
  cerrarComponente(): void {
    this.showRegistro = false;
    this.cerrarComponenteEvent.emit();
  }



}
