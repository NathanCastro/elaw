import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalDefaultComponent } from './modal-default/modal-default.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';

import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ModalDefaultComponent, ModalDeleteComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [ModalDefaultComponent],
})
export class SharedModule { }
