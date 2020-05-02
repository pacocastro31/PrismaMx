import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBannerSliderComponent } from './home-banner-slider.component';

describe('HomeBannerSliderComponent', () => {
  let component: HomeBannerSliderComponent;
  let fixture: ComponentFixture<HomeBannerSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBannerSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBannerSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
