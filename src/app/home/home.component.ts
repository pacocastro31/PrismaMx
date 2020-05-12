import { Component, OnInit } from '@angular/core';

import { BannerInfo } from '../admin/home-slider/home-banner-info'
import { SliderService } from '../admin/home-slider/slider.service'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sliders: any

  constructor(private sliderService: SliderService) { }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(){
    this.sliderService.getSliderInfo().snapshotChanges().pipe(
      map(changes=>
        changes.map(c =>
            ({key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(Cinfo => {
      this.sliders = Cinfo;
    });
  }

}
