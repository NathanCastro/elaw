import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CustomerDetailComponent } from './customer/pages/customer-detail/customer-detail.component';
import { CustomerInsertComponent } from './customer/pages/customer-insert/customer-insert.component';
import { CustomerListComponent } from './customer/pages/customer-list/customer-list.component';

import { CustomerUpdateComponent } from './customer/pages/customer-update/customer-update.component';
@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerInsertComponent,
    CustomerUpdateComponent,
    CustomerDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
