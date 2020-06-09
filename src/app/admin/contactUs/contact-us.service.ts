import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { ContactUsInfo } from './contactUs'

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  private dbPath = "/admin/contactUs";
  contactUsRef: AngularFireList<ContactUsInfo> = null;
  contactUs: any;

  constructor(private db: AngularFireDatabase) {
    this.contactUsRef = db.list(this.dbPath);
  }

  createContactUs(info: ContactUsInfo): void {
    this.contactUsRef.push(info);
    console.log("Se guardo");
  }

  updateContactUs(key: string, value: any): Promise<void> {
    return this.contactUsRef.update(key, value);
  }

  getContactUsInfo(): AngularFireList<ContactUsInfo> {
    return this.contactUsRef;
  }
}
