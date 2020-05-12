import { Component, OnInit } from '@angular/core';

import { BannerInfo } from '../admin/home-slider/home-banner-info';
import { SliderService } from '../admin/home-slider/slider.service';

import { ServicioParte1 } from '../admin/serviciosParte1/serviciosParte1';
import { ServiciosParte1Service } from '../admin/serviciosParte1/servicios-parte1.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sliders: any
  servicios: any

  constructor(private sliderService: SliderService, private servicio1Service: ServiciosParte1Service) { }

  ngOnInit(): void {
    this.getInfoSliders();
    this.getInfoServicios();
  }

  getInfoSliders(){
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

  getInfoServicios(){
    this.servicio1Service.getServicioInfo().snapshotChanges().pipe(
      map(changes=>
        changes.map(c =>
            ({key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(Cinfo => {
      this.servicios = Cinfo;
    });
  }

}
