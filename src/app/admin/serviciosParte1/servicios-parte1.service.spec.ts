import { TestBed } from '@angular/core/testing';

import { ServiciosParte1Service } from './servicios-parte1.service';

describe('ServiciosParte1Service', () => {
  let service: ServiciosParte1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosParte1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
