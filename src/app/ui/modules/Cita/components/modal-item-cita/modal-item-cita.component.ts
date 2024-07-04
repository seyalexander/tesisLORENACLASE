import { Component, EventEmitter, Input, Output } from '@angular/core';
import { citasModel } from '../../../../../domain/models/citas/citas.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CommonModule } from '@angular/common';
import { clienteModel } from '../../../../../domain/models/clientes/clientes.model';
import { choferesModel } from '../../../../../domain/models/choferes/choferes.model';

@Component({
  selector: 'app-modal-item-cita',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-item-cita.component.html',
  styleUrl: './modal-item-cita.component.css'
})
export class ModalItemCitaComponent {

  @Input() citaSeleccionada: citasModel = {} as citasModel;
  @Input() clienteSeleecionada: clienteModel = {} as clienteModel;
  @Input() choferSeleecionada: choferesModel = {} as choferesModel;

  exportToPDF() {
    const doc = new jsPDF();

    // Establecer el título del documento
    doc.text('Detalle de Cita', 14, 16);

    // Definir las columnas
    const columns = [
      { title: 'Matrícula', dataKey: 'matricula' },
      { title: 'Fecha', dataKey: 'fecha' },
      { title: 'Hora', dataKey: 'hora' }
    ];

    // Datos a mostrar
    const data = [{
      matricula: this.citaSeleccionada.id_Auto_Fk.matricula,
      fecha: this.citaSeleccionada.fecha,
      hora: this.citaSeleccionada.hora
    }];

    // Generar la tabla
    autoTable(doc, {
      head: [columns.map(col => col.title)],
      body: data.map(item => [item.matricula.toString(), item.fecha, item.hora]),
      startY: 25, // Ajuste para no solaparse con el título
      styles: { // Estilos generales
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 4,
        textColor: [34, 34, 34],
        fillColor: [255, 255, 255],
        lineColor: [44, 62, 80],
        lineWidth: 0.2,
      },
      headStyles: { // Estilos de la cabecera
        fillColor: [52, 152, 219], // Azul claro
        textColor: [255, 255, 255], // Blanco
        fontSize: 12,
        fontStyle: 'bold',
        halign: 'center' // Alineación horizontal centrada
      },
      alternateRowStyles: { // Estilos de filas alternas
        fillColor: [245, 245, 245]
      },
      columnStyles: { // Estilos específicos por columna
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 'auto' }
      }
    });

    // Guardar el PDF o abrirlo en una nueva ventana
    doc.save('detalle_cita.pdf');
    // window.open(doc.output('bloburl'), '_blank');
  }
}
