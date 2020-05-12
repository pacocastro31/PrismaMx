import { Component, OnInit } from '@angular/core';

import { BannerInfo } from '../home-banner-info'
import { SliderService } from '../slider.service'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-slider-list',
  templateUrl: './home-slider-list.component.html',
  styleUrls: ['./home-slider-list.component.css']
})
export class HomeSliderListComponent implements OnInit {

  sliders: any

  constructor(private sliderService: SliderService) { }

  ngOnInit(): void {
    this.getInfo()
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
