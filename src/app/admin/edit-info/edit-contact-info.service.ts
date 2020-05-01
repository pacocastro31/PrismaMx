import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { ContactInfo } from './contact-info'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditContactInfoService {

  private dbPath = "/admin/editContact"
  contactInfoRef: AngularFireList<ContactInfo> = null;
  contactInfo: any;

  constructor(private db: AngularFireDatabase) {
		this.contactInfoRef = db.list(this.dbPath);
  }

  createContactInfo(info: ContactInfo): void {
    this.contactInfoRef.push(info);
    console.log("Se guardo")
	}

  updateContactInfo(key: string, value: any): Promise<void> {
		return this.contactInfoRef.update(key, value);
  }

  getContactInfo(): AngularFireList<ContactInfo> {
		return this.contactInfoRef;
  }
}

