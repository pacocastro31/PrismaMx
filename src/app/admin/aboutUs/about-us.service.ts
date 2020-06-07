import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AboutUsInfo } from "./aboutUs";

@Injectable({
  providedIn: "root",
})
export class AboutUsService {
  private dbPath = "/admin/aboutUs";
  aboutUsRef: AngularFireList<AboutUsInfo> = null;
  aboutUs: any;

  constructor(private db: AngularFireDatabase) {
    this.aboutUsRef = db.list(this.dbPath);
  }

  createAboutUs(info: AboutUsInfo): void {
    this.aboutUsRef.push(info);
    console.log("Se guardo");
  }

  updateAboutUs(key: string, value: any): Promise<void> {
    return this.aboutUsRef.update(key, value);
  }

  getAboutUsInfo(): AngularFireList<AboutUsInfo> {
    return this.aboutUsRef;
  }
}
