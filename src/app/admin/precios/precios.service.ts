import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Prices } from './precios'

@Injectable({
  providedIn: 'root'
})
export class PreciosService {

  private dbPath = "/admin/prices"
  pricesoRef: AngularFireList<Prices> = null;
  prices: any;

  constructor(private db: AngularFireDatabase) {
		this.pricesoRef = db.list(this.dbPath);
  }

  createPrices(info: Prices): void {
    this.pricesoRef.push(info);
    console.log("Se guardo")
	}

  updatePrices(key: string, value: any): Promise<void> {
    return this.pricesoRef.update(key, value);
  }

  getPrices(): AngularFireList<Prices> {
		return this.pricesoRef;
  }
}
