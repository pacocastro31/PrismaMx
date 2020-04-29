import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
let CustomerDetailsComponent = class CustomerDetailsComponent {
    constructor(customerService) {
        this.customerService = customerService;
    }
    ngOnInit() { }
    updateName(name) {
        this.customerService.updateCustomer(this.customer.key, { name: name }).catch(err => console.log(err));
    }
    deleteCustomer() {
        this.customerService.deleteCustomer(this.customer.key).catch(err => console.log(err));
    }
};
__decorate([
    Input()
], CustomerDetailsComponent.prototype, "customer", void 0);
CustomerDetailsComponent = __decorate([
    Component({
        selector: "app-customer-details",
        templateUrl: "./customer-details.component.html",
        styleUrls: ["./customer-details.component.css"],
    })
], CustomerDetailsComponent);
export { CustomerDetailsComponent };
//# sourceMappingURL=customer-details.component.js.map