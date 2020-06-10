import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let CustomerService = class CustomerService {
    constructor(db) {
        this.db = db;
        this.dbPath = "/customers";
        this.customersRef = null;
        this.customersRef = db.list(this.dbPath);
    }
    createCustomer(customer) {
        this.customersRef.push(customer);
    }
    updateCustomer(key, value) {
        return this.customersRef.update(key, value);
    }
    deleteCustomer(key) {
        return this.customersRef.remove(key);
    }
    getCustomerList() {
        return this.customersRef;
    }
    deleteAll() {
        return this.customersRef.remove();
    }
};
CustomerService = __decorate([
    Injectable({
        providedIn: "root",
    })
], CustomerService);
export { CustomerService };
//# sourceMappingURL=customer.service.js.map