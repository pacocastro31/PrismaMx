import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { InventarioInfo } from './inventario'

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private dbPath = "/dashboard/inventario"
  inventarioRef: AngularFireList<InventarioInfo> = null;
  inventario: any;

  constructor(private db: AngularFireDatabase) { 
    this.inventarioRef = db.list(this.dbPath);
  }

  createInventario(info: InventarioInfo): void {
    this.inventarioRef.push(info);
    console.log("Se guardo")
  }

  getInventarioInfo(): AngularFireList<InventarioInfo> {
		return this.inventarioRef;
  }

  deleteInventario(key: string): Promise<void> {
		return this.inventarioRef.remove(key);
  }
  
  updateInventario(key: string, value: any): Promise<void> {
    return this.inventarioRef.update(key, value);
  }
}
