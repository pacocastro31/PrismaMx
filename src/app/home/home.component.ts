import { Component, OnInit } from '@angular/core';

import { BannerInfo } from '../admin/home-slider/home-banner-info';
import { SliderService } from '../admin/home-slider/slider.service';

import { ServicioParte1 } from '../admin/serviciosParte1/serviciosParte1';
import { ServiciosParte1Service } from '../admin/serviciosParte1/servicios-parte1.service';

import { AboutUsInfo } from '../admin/aboutUs/aboutUs';
import { AboutUsService } from '../admin/aboutUs/about-us.service';

import { Prices } from '../admin/precios/precios';
import { PreciosService } from '../admin/precios/precios.service';

import { Faqs } from '../admin/faqs/faqs';
import { FaqsService } from '../admin/faqs/faqs.service';

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
  sliders: any;
  servicios: any;
  faqs: any;
  aboutUs: any;

  constructor(private sliderService: SliderService,
  private servicio1Service: ServiciosParte1Service,
  private priceServices: PreciosService,
  private faqService: FaqsService,
  private aboutUsService: AboutUsService) { }

  ngOnInit(): void {
    this.getInfoSliders();
    this.getInfoServicios();
    this.getInfoPrices();
    this.getInfo();
    this.getAboutUsInfo();
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

  getInfo(){
    this.faqService.getFaqsInfo().snapshotChanges().pipe(
      map(changes=>
        changes.map(c =>
            ({key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(Cinfo => {
      this.faqs = Cinfo;
    });
  }

  getAboutUsInfo(){
    this.aboutUsService.getAboutUsInfo().snapshotChanges().pipe(
      map(changes=>
        changes.map(c =>
            ({key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(Cinfo => {
      this.aboutUs = Cinfo;
    });
  }

}
