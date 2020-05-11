import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import{cotizacion} from "./cotizacion"

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private dbPath = "/cotizacion"
  cotizacionesInfoRef: AngularFireList<cotizacion> = null;
  cotizacionsInfo: any;

  constructor(private db: AngularFireDatabase) {
		this.cotizacionesInfoRef = db.list(this.dbPath);
  }

  createCotizacion(info: cotizacion, id: string): void {
    info.id = id;
    info.status = "pendiendte";
    info.precio = "500";
    this.cotizacionesInfoRef.push(info);
    console.log("Se guardo")
	}
}
