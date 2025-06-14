import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-default',
  templateUrl: './modal-default.component.html',
  styleUrls: ['./modal-default.component.css']
})
export class ModalDefaultComponent {
  @Input() showFooter = true;

  constructor(public dialog: MatDialog) {}

  close(): void {
    if (this.dialog) {
      this.dialog.closeAll();
    }
  }
}
