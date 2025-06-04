import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModalConfig } from 'src/app/@shared/modal-default/modal-config';
import { ModalDeleteComponent } from 'src/app/@shared/modal-delete/modal-delete.component';
import { customerColumn } from '../../constant/column-customer';
import { CustomerService } from '../../customer.service';
import { Customer } from '../../model/Customer';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { CustomerInsertComponent } from '../customer-insert/customer-insert.component';
import { CustomerUpdateComponent } from '../customer-update/customer-update.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public clients: Customer[] = [];

  dataSource = new MatTableDataSource<Customer>();
  displayedColumns = customerColumn;  
  
  private subscriptions: Subscription = new Subscription();

  
  constructor(
    public dialog: MatDialog,
    private customerService: CustomerService
  ){}

  ngOnInit(): void {
    this.getAllCustomers();
    const sub = this.customerService.customerUpdatedSubject.subscribe(() => {
      this.getAllCustomers();
    });

    this.subscriptions.add(sub);

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getAllCustomers() {
  const sub = this.customerService.getAll().subscribe(customers => {
    this.clients = customers;
    this.dataSource = new MatTableDataSource<Customer>(this.clients);
    this.dataSource.paginator = this.paginator;
  });
  this.subscriptions.add(sub);
}


  public openNewCustomerDialog(){
    this.dialog.open(CustomerInsertComponent, ModalConfig.MEDIUM)
  }

  public onEdit(elementCustomer: Customer){
    this.subscriptions.add(this.customerService.getById(elementCustomer.id).subscribe(customer=> {
      if(customer) {
        this.dialog.open(CustomerUpdateComponent,{
          ...ModalConfig.MEDIUM,
          data: elementCustomer,
        })
      }
    }))
  }

  public openCustomerDetails(id:string){
    this.subscriptions.add(this.customerService.getById(id).subscribe(customer=> {
      if(customer) {
        this.dialog.open(CustomerDetailComponent,{
          ...ModalConfig.MEDIUM,
          data: customer,
        })
      }
    }));
  }

  public confirmDeleteCustomer(id:string){
    const modal = this.dialog.open(ModalDeleteComponent, {
      disableClose: false,
      data:{ 
        title: "Deletar",
        subtitle: `Deseja apagar?`
      }
    });

    this.subscriptions.add(modal.componentInstance.confirmDelete.subscribe(() =>{
      this.customerService.deleteCustomer(id)
    }))
    
  }

   
}
