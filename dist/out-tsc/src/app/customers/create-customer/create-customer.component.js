import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Customer } from '../customer';
let CreateCustomerComponent = class CreateCustomerComponent {
    constructor(customerService) {
        this.customerService = customerService;
        this.customer = new Customer();
        this.submitted = false;
    }
    ngOnInit() {
    }
    newCustomer() {
        this.submitted = false;
        this.customer = new Customer();
    }
    save() {
        this.customerService.createCustomer(this.customer);
        this.customer = new Customer();
    }
    onSubmit() {
        this.submitted = true;
        this.save();
    }
};
CreateCustomerComponent = __decorate([
    Component({
        selector: 'app-create-customer',
        templateUrl: './create-customer.component.html',
        styleUrls: ['./create-customer.component.css']
    })
], CreateCustomerComponent);
export { CreateCustomerComponent };
//# sourceMappingURL=create-customer.component.js.map