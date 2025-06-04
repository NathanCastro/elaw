import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Customer } from '../../model/Customer';
import { CustomerService } from './../../customer.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit{ 
  
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private customerService: CustomerService
  ){}

  ngOnInit(){
    this.setForm();
  }
  
  public cancel(){
    this.dialog.closeAll();
  };

  public save(){
    if(this.form.dirty && this.form.valid){
      const updatedCustomer = this.form.value;
      this.customerService.updateCustomer(updatedCustomer);
      this.dialog.closeAll();
    }
  };

  private setForm(){
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      street: ['', Validators.required],
      numberHouse: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
    this.setValue();
  }

  private setValue(){
    this.form.get('id')?.setValue(this.data.id);
    this.form.get('name')?.setValue(this.data.name);
    this.form.get('email')?.setValue(this.data.email);
    this.form.get('telephone')?.setValue(this.data.telephone);
    this.form.get('street')?.setValue(this.data.street);
    this.form.get('numberHouse')?.setValue(this.data.numberHouse);
    this.form.get('city')?.setValue(this.data.city);
    this.form.get('state')?.setValue(this.data.state);
    this.form.get('zip')?.setValue(this.data.zip);
  }
}
