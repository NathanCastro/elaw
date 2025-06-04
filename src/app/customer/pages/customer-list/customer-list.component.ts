import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  @Input() public customerId: string; 

  public clients: Customer[] = [];


  dataSource = new MatTableDataSource<Customer>();
  displayedColumns = customerColumn;  
  
  constructor(
    public dialog: MatDialog,
    private customerService: CustomerService
  ){}

  ngOnInit(): void {
    this.getAllCustomers();
    // this.customerService.customerUpdatedSubject.subscribe(() => {
    //   this.getAllCustomers();
    // });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public newCustomer(){
    this.dialog.open(CustomerInsertComponent, ModalConfig.MEDIUM)
  }

  public onEdit(elementCustomer: Customer){
    this.customerService.getById(elementCustomer.id).subscribe(customer=> {
      console.log(customer)
      if(customer) {
        this.dialog.open(CustomerUpdateComponent,{
          ...ModalConfig.MEDIUM,
          data: elementCustomer,
        })
      }
    })
  }

  public showDetails(id:string){
    this.customerService.getById(id).subscribe(customer=> {
      if(customer) {
        this.dialog.open(CustomerDetailComponent,{
          ...ModalConfig.MEDIUM,
          data: customer,
        })
      }
    });
  }

  public delete(id:string){
    const modal = this.dialog.open(ModalDeleteComponent, {
      disableClose: false,
      data:{ 
        title: "Deletar",
        subtitle: `Deseja apagar?`
      }
    });

    modal.componentInstance.confirmDelete.subscribe(() =>{
      this.customerService.deleteCustomer(id)
    })
    
  }

  public getAllCustomers(){
    this.clients = this.customerService.getAll();
    this.dataSource = new MatTableDataSource<Customer>(this.clients);
    this.dataSource.paginator = this.paginator;
  }  
}
