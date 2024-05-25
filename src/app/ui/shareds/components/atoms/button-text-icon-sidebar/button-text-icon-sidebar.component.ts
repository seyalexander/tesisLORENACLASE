import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button-text-icon-sidebar',
    templateUrl: './button-text-icon-sidebar.component.html',
    styleUrls: ['./button-text-icon-sidebar.component.css'],
    standalone: true
})
export class ButtonTextIconSidebarComponent {
  @Input() iconLeftButton?: String = '';
  @Input() iconRigthButton?: String = '';
  @Input() textButton?: String = '';
  @Input() buttonAtom?: String = '';
  @Input() mode: 'aside' | 'header' | 'subHeader'= 'aside';

}
