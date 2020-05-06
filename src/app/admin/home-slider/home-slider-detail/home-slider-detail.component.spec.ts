import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSliderDetailComponent } from './home-slider-detail.component';

describe('HomeSliderDetailComponent', () => {
  let component: HomeSliderDetailComponent;
  let fixture: ComponentFixture<HomeSliderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSliderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSliderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
