import { CustomerService } from './../../services/customer.service';
import { Customer } from './../../model/customer';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {

  public customers: Customer[];
  public editCustomer:Customer;
  public deleteCustomer: Customer;
  public pageSize = 8;
  public page = 1;

  constructor(private service: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }


public getCustomers(): void{
   this.service.getCustomers().subscribe(
     (response: Customer[]) =>{
       this.customers = response;
     },
     (error: HttpErrorResponse) =>{
        alert(error.message);
     }    
   );
}

onAddCustomer(addForm:NgForm): void{
  document.getElementById('add-employee-form').click();
  this.service.addCustomers(addForm.value).subscribe(
    (response:Customer) =>{
      console.log(response);
      this.getCustomers();
      addForm.reset();
    },
    (error:HttpErrorResponse) =>{
      alert(error.message);
    }
  );
}


onUpdateCustomer(customer:Customer): void{
  this.service.addCustomers(customer).subscribe(
    (response:Customer) =>{
      console.log(response);
      this.getCustomers();
    },
    (error:HttpErrorResponse) =>{
      alert(error.message);
    }
  );
}


onDeleteCustomer(customerId:number): void{
  this.service.deleteCustomers(customerId).subscribe(
    (response:void) =>{
      console.log(response);
      this.getCustomers();
    },
    (error:HttpErrorResponse) =>{
      alert(error.message);
    }
  );
}


public searchCustomer(key: string): void {
  const results: Customer[] = [];
  for (const customer of this.customers) {
    if (customer.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || customer.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 
        || customer.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 
        || customer.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(customer);
    }
  }
  this.customers = results;
  if (results.length === 0 || !key) {
    this.getCustomers();
  }
}







public onOpenModal(customer: Customer, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addCustomerModal');
  }
  if (mode === 'edit') {
    this.editCustomer = customer;
    button.setAttribute('data-target', '#updateCustomerModal');
  }
  if (mode === 'delete') {
    this.deleteCustomer = customer;
    button.setAttribute('data-target', '#deleteCustomerModal');
  }
  container.appendChild(button);
  button.click();
}









}
