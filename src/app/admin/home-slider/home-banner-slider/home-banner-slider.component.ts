import { Component, OnInit } from '@angular/core';

import { BannerInfo } from '../home-banner-info'
import { SliderService } from '../slider.service'

import { map } from 'rxjs/operators';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from 'rxjs/operators';
import { Observable } from "rxjs";

@Component({
  selector: 'app-home-banner-slider',
  templateUrl: './home-banner-slider.component.html',
  styleUrls: ['./home-banner-slider.component.css']
})
export class HomeBannerSliderComponent implements OnInit {
  
  banner: BannerInfo = new BannerInfo();
  submitted = false;

  selectedImage: any
  downloadURL: Observable<string>;
  fb: any;
  dwUrl: any;

  constructor(private sliderService: SliderService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.save();
    this.clear();
  }

  save(){
    this.submitted = true
    this.sliderService.createBanner(this.banner, this.fb)
  }

  clear(){
    this.banner.title = ""
    this.banner.subtitle = ""
    this.banner.cta = ""
  }

  saveImage(event: any){
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `admin/homeBanner/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`admin/homeBanner/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

}
