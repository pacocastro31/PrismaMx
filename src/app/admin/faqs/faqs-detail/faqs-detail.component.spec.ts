import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsDetailComponent } from './faqs-detail.component';

describe('FaqsDetailComponent', () => {
  let component: FaqsDetailComponent;
  let fixture: ComponentFixture<FaqsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
