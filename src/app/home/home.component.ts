import { Component, OnInit } from '@angular/core';

import { BannerInfo } from '../admin/home-slider/home-banner-info';
import { SliderService } from '../admin/home-slider/slider.service';

import { ServicioParte1 } from '../admin/serviciosParte1/serviciosParte1';
import { ServiciosParte1Service } from '../admin/serviciosParte1/servicios-parte1.service';

import { Prices } from '../admin/precios/precios';
import { PreciosService } from '../admin/precios/precios.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'owl-carousel';

  mySlideOptions = {
    center: false,
    items: 1,
    loop: true,
    stagePadding: 0,
    margin: 0,
    smartSpeed: 1500,
    autoplay: true,
    pauseOnHover: false,
    dots: true,
    nav: true,
    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
  };

  myCarouselOptions = {
    center: false,
    items: 1,
    loop: true,
    stagePadding: 0,
    margin: 0,
    smartSpeed: 1500,
    autoplay: true,
    pauseOnHover: false,
    dots: true,
    nav: true,
    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
  };

  info: any;
  sliders: any
  servicios: any

  constructor(private sliderService: SliderService, private servicio1Service: ServiciosParte1Service, private priceServices: PreciosService) { }

  ngOnInit(): void {
    this.getInfoSliders();
    this.getInfoServicios();
    this.getInfoPrices();
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

  getInfoPrices(){
    this.priceServices.getPrices().snapshotChanges().pipe(
      map(changes=>
        changes.map(c =>
            ({key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(Cinfo => {
      this.info = Cinfo;
    });
  }

}
