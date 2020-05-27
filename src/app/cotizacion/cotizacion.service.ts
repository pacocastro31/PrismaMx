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
    var color = (<HTMLSelectElement>document.getElementById("colorLb")).value; 
    var material = (<HTMLSelectElement>document.getElementById("materialLb")).value; 
    var calidad = (<HTMLSelectElement>document.getElementById("calidadLb")).value; 
    var relleno = (<HTMLSelectElement>document.getElementById("rellenoLB")).value; 
    var cantidad = (<HTMLSelectElement>document.getElementById("cantidadLB")).value; 
    if(color == ""){
      info.color = "Sin especificar";
    }
    if(material == ""){
      info.material = "PLA";
    }
    if(calidad == ""){
      info.calidad = "Normal";
    }
    if(relleno == ""){
      info.relleno = "20";
    }
    if(cantidad == ""){
      info.cantidad = "1";
    }
    info.id = id;
    info.fecha = fecha;
    info.status = "pendiente";
    info.precio = "500";
    info.precioReal = "0";
    this.cotizacionesInfoRef.push(info);
    console.log("Se guardo")
  }

  //getPedido(id: string) {
    //return this.cotizacionesInfoRef.doc(id).snapshotChanges();
  //}

  getPedidos(): AngularFireList<cotizacion> {
    return this.cotizacionesInfoRef;
  }

  updatePedido(key: string, value: any): Promise<void> {
		return this.cotizacionesInfoRef.update(key, value);
  }
}
