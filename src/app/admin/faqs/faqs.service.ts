import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Faqs } from './faqs'

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  private dbPath = "/admin/faqs"
  faqsRef: AngularFireList<Faqs> = null;
  faqs: any;

  constructor(private db: AngularFireDatabase) { 
    this.faqsRef = db.list(this.dbPath);
  }

  createFaq(info: Faqs): void {
    this.faqsRef.push(info);
    console.log("Se guardo")
  }

  getFaqsInfo(): AngularFireList<Faqs> {
		return this.faqsRef;
  }

  deleteFaq(key: string): Promise<void> {
		return this.faqsRef.remove(key);
	}
}
