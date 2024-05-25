import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-th-tables-icon-text',
    templateUrl: './th-tables-icon-text.component.html',
    styleUrls: ['./th-tables-icon-text.component.css'],
    standalone: true
})
export class ThTablesIconTextComponent {
  @Input() nombreTh: string = '';
}
