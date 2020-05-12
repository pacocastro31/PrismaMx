import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { BannerInfo } from './home-banner-info'

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private dbPath = "/admin/homeSlider"
  bannerInfoRef: AngularFireList<BannerInfo> = null;
  bannerInfo: any;

  constructor(private db: AngularFireDatabase) {
		this.bannerInfoRef = db.list(this.dbPath);
  }

  createBanner(info: BannerInfo, img: string): void {
    info.imagen = img
    this.bannerInfoRef.push(info);
    console.log("Se guardo")
  }
  
  getSliderInfo(): AngularFireList<BannerInfo> {
		return this.bannerInfoRef;
  }

  deleteSlider(key: string): Promise<void> {
		return this.bannerInfoRef.remove(key);
	}
}
