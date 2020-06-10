import { TestBed } from '@angular/core/testing';

import { EditContactInfoService } from './edit-contact-info.service';

describe('EditContactInfoService', () => {
  let service: EditContactInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditContactInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
