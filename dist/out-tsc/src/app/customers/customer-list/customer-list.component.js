import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
let CustomerListComponent = class CustomerListComponent {
    constructor(customerService) {
        this.customerService = customerService;
    }
    ngOnInit() {
        this.getCustomersList();
    }
    getCustomersList() {
        this.customerService.getCustomerList().snapshotChanges().pipe(map(changes => changes.map(c => (Object.assign({ key: c.payload.key }, c.payload.val()))))).subscribe(customers => {
            this.customers = customers;
        });
    }
};
CustomerListComponent = __decorate([
    Component({
        selector: 'app-customer-list',
        templateUrl: './customer-list.component.html',
        styleUrls: ['./customer-list.component.css']
    })
], CustomerListComponent);
export { CustomerListComponent };
//# sourceMappingURL=customer-list.component.js.map