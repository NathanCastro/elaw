import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { customerColumn } from '../../constant/column-customer';
import { Customer } from '../../model/Customer';
import { CustomerInsertComponent } from '../customer-insert/customer-insert.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  // public client: Customer = new Customer;
  
  dataSource = new MatTableDataSource<Customer>();
  displayedColumns = customerColumn;
  public deleteSubscription: Subscription = new Subscription();
  
  constructor(
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    console.log()
  }

  public newCustomer(){
    this.dialog.open(CustomerInsertComponent,{

    })
  }

  public onEdit(id:string){}

  public showDetails(id:string){}

  public delete(id:string, name:string){}
}
