import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from '../../model/Customer';
import { CustomerService } from './../../customer.service';

@Component({
  selector: 'app-customer-insert',
  templateUrl: './customer-insert.component.html',
  styleUrls: ['./customer-insert.component.css']
})
export class CustomerInsertComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private customerService: CustomerService
  ){}

  ngOnInit(){
    this.setForm();
  }


  public verificaValidTouched(field:any){
    return !this.form.get(field)?.valid && this.form.get(field)?.touched;     
  }
  
  public cancel(){
    this.dialog.closeAll();
  };

  public save() {
    if (this.form.valid) {
    const customer = {
      ...this.form.value,
      id: Date.now()
    };

    const clientList = this.customerService.getAll();
    const emailTyped = this.form.get('email')?.value;

    const emailAlreadyExists = clientList.some(
      (c: Customer) => c.email === emailTyped
    );

    if (emailAlreadyExists) {
      // retirrar e colocar validador
      alert('E-mail já cadastrado!'); 
      return;
    }

    this.customerService.addCustomer(customer);
    this.form.reset();
    this.dialog.closeAll();

  }
}

  private setForm(){
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      street: ['', Validators.required],
      numberHouse: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

}
