import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { cotizacion }  from "./cotizacion"

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

  createCotizacion(info: cotizacion, id: string,fecha:string): void {
    info.id = id;
    info.fecha = fecha;
    info.status = "pendiente";
    info.precio = "500";
    info.precioReal = "0";
    this.cotizacionesInfoRef.push(info);
    console.log("Se guardo")
  }
  
  getPedidos(): AngularFireList<cotizacion> {
    return this.cotizacionesInfoRef;
  }

  updatePedido(key: string, value: any): Promise<void> {
		return this.cotizacionesInfoRef.update(key, value);
  }
}
