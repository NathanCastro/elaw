import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Customer } from './model/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public customerUpdatedSubject = new Subject<void>();

  private key = 'customers';

  constructor() { }

  

  public getAll(): Observable<Customer[]>{
   return of(this.getStorage());
  }

  public getById(id:string): Observable<Customer | undefined> {
    const customers: Customer[] = this.getStorage();
    const customer = customers.find(c => c.id === id);
    return of(customer); 
  }

  public addCustomer(client: Customer): Observable<Customer> {
    const customers = this.getStorage();
    customers.push(client);
    this.setStorage(customers);
    this.customerUpdatedSubject.next();
    return of(client);
  }

  public updateCustomer(updatedCustomer: Customer): Observable<Customer | null> {
    const customers = this.getStorage();
    const index = customers.findIndex(x => x.id === updatedCustomer.id);

    if (index !== -1) {
      customers[index] = updatedCustomer;
      this.setStorage(customers);
      this.customerUpdatedSubject.next();
      return of(updatedCustomer);
    }

    return of(null);
  }


  public deleteCustomer(id: string): Observable<boolean> {
    const clients = this.getStorage();
    const index = clients.findIndex((x: Customer) => x.id === id);

    if (index > -1) {
      clients.splice(index, 1);
      this.setStorage(clients);
      this.customerUpdatedSubject.next();
      return of(true);
    }
    return of(false);
  }


  private getStorage(): Customer[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  private setStorage(customers: Customer[]): void {
    localStorage.setItem(this.key, JSON.stringify(customers));
  }
}
