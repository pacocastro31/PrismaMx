import { Component, OnInit } from '@angular/core';

import { BannerInfo } from '../home-banner-info'
import { SliderService } from '../slider.service'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-banner-slider',
  templateUrl: './home-banner-slider.component.html',
  styleUrls: ['./home-banner-slider.component.css']
})
export class HomeBannerSliderComponent implements OnInit {
  contArr = []
  cont = 1
  banner: BannerInfo = new BannerInfo();
  submitted = false;

  constructor(private sliderService: SliderService) { }

  ngOnInit(): void {
  }

  clickAgregar(){
    this.contArr.push(this.cont + 1)
  }

  onSubmit() {
    this.save();
    this.clear();
  }

  save(){
    this.submitted = true
    this.sliderService.createBanner(this.banner)
  }

  clear(){
    this.banner.title = ""
    this.banner.subtitle = ""
    this.banner.cta = ""
  }
}
