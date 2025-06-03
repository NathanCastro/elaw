import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../@shared/shared.module';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail.component';
import { CustomerInsertComponent } from './pages/customer-insert/customer-insert.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerUpdateComponent } from './pages/customer-update/customer-update.component';



@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerInsertComponent,
    CustomerUpdateComponent,
    CustomerDetailComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomerListComponent
  ]
})
export class CustomerModule { }
