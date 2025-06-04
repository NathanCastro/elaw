import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Customer } from '../../model/Customer';
import { CustomerService } from './../../customer.service';

@Component({
  selector: 'app-customer-insert',
  templateUrl: './customer-insert.component.html',
  styleUrls: ['./customer-insert.component.css']
})
export class CustomerInsertComponent implements OnInit {
  
  public form: FormGroup;
  public errorField: any;
  public clients: Customer[] = [];

  private subscriptions: Subscription = new Subscription();
  
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private customerService: CustomerService
  ){}

  ngOnInit(): void {
    this.setForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public fieldIsValid(control: AbstractControl  | null): boolean{
    return !!control && control.invalid && control.touched
  }
  
  public cancel(): void {
    this.dialog.closeAll();
  };

  public save(): void {
    if (this.form.valid) {
      const customer = {
        ...this.form.value,
        id: Date.now()
      };

      const emailTyped = this.form.get('email')?.value;

      const sub = this.customerService.getAll().subscribe(customers => {
        const emailAlreadyExists = customers.some(c => c.email === emailTyped);

        if (emailAlreadyExists) {
          this.form.get('email')?.setErrors({ emailTaken: true });
          return;
        }

        this.customerService.addCustomer(customer);
        this.form.reset();
        this.dialog.closeAll();
      });
      this.subscriptions.add(sub);
    }
  }

  private setForm(): void{
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

