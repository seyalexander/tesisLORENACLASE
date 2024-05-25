import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header-movil-home',
    templateUrl: './header-movil-home.component.html',
    styleUrls: ['./header-movil-home.component.css'],
    standalone: true
})
export class HeaderMovilHomeComponent {

  @Output() abrirComponenteEvent = new EventEmitter<void>();

  abrirComponente(): void {
    this.abrirComponenteEvent.emit();
  }

}
