import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../model/Customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent {
  
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private fb: FormBuilder
  ){}

  ngOnInit(){
    this.setForm();
  }

  private setForm(){
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      street: ['', Validators.required],
      numberHouse: [null, Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
    this.form.disable();
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
