import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './model/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public customerUpdatedSubject = new EventEmitter()
  private key = 'customers';

  constructor() { }

  private getStorage(): Customer[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  private setStorage(customers: any[]) {
    localStorage.setItem(this.key, JSON.stringify(customers));
  }

  getAll(): Customer[]{
    return this.getStorage();
  }

  getById(id:string): Observable<Customer | undefined> {
    const customers: Customer[] = this.getStorage();
    const customer = customers.find(c => c.id === id);
    return of(customer); 
  }

  addCustomer(client: Customer){
    const customers = this.getStorage();
    customers.push(client);
    this.setStorage(customers);
    this.customerUpdatedSubject.emit();
  }

  updateCustomer(id:string){

    this.customerUpdatedSubject.emit();
  }

  deleteCustomer(id: string) {
    const clients = this.getStorage();
    const index = clients.findIndex((c: Customer) => c.id === id);

    if (index > -1) {
      clients.splice(index, 1);
      this.setStorage(clients);
      this.customerUpdatedSubject.emit();
    }
  }

}
