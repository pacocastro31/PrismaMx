import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../customer.service";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  
  customers: any;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomersList();
  }

  getCustomersList(){
    this.customerService.getCustomerList().snapshotChanges().pipe(
      map(changes=>
        changes.map(c =>
            ({key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(customers => {
      this.customers = customers;
    });
  }

}
