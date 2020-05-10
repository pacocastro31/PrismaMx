import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { ServicioParte1 } from "./serviciosParte1"

@Injectable({
  providedIn: 'root'
})
export class ServiciosParte1Service {

  private dbPath = "/admin/servicios1"
  serviciosParte1Ref: AngularFireList<ServicioParte1> = null;
  serviciosParte1: any;

  constructor(private db: AngularFireDatabase) { 
    this.serviciosParte1Ref = db.list(this.dbPath);
  }

  createServicio1(info: ServicioParte1): void {
    this.serviciosParte1Ref.push(info);
    console.log("Se guardo")
  }

  getServicioInfo(): AngularFireList<ServicioParte1> {
		return this.serviciosParte1Ref;
  }

  deleteServicio(key: string): Promise<void> {
		return this.serviciosParte1Ref.remove(key);
	}
}
