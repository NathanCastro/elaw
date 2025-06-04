import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Customer } from '../../model/Customer';
import { CustomerService } from './../../customer.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit{ 
  
  public form: FormGroup;
  private subscriptions: Subscription = new Subscription();
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private customerService: CustomerService
  ){}

  ngOnInit(): void{
    this.setForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public fieldIsValid(control: AbstractControl  | null): boolean{
    return !!control && control.invalid && control.touched
  }
  
  public cancel(): void{
    this.dialog.closeAll();
  };

  public save(): void {
    if (this.form.dirty && this.form.valid) {
      const updatedCustomer = this.form.value;

      const emailTyped = this.form.get('email')?.value;

      const sub = this.customerService.getAll().subscribe(customers => {
        const emailAlreadyExists = customers.some(
          (c: Customer) => c.email === emailTyped && c.id !== updatedCustomer.id
        );

        if (emailAlreadyExists) {
          this.form.get('email')?.setErrors({ emailTaken: true });
          return;
        }
        
        this.customerService.updateCustomer(updatedCustomer);
        this.dialog.closeAll();
      });
      this.subscriptions.add(sub);
    }
  }

  private setForm(): void{
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

  private setValue(): void{
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
