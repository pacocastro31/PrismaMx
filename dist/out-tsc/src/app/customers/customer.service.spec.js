import { TestBed } from '@angular/core/testing';
import { CustomerService } from './customer.service';
describe('CustomerService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CustomerService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=customer.service.spec.js.map