import { Component, OnInit, Input } from '@angular/core';

import { BannerInfo } from '../home-banner-info'
import { SliderService } from '../slider.service'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-slider-detail',
  templateUrl: './home-slider-detail.component.html',
  styleUrls: ['./home-slider-detail.component.css']
})
export class HomeSliderDetailComponent implements OnInit {
  @Input() slider: BannerInfo;

  constructor(private sliderService: SliderService) { }

  ngOnInit(): void {
  }

  deleteSlider(){
    this.sliderService.deleteSlider(this.slider.key).catch(err => console.log(err));
  }
}
