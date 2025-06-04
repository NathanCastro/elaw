import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CustomerModule } from './customer/customer.module';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule, 
    CustomerModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
