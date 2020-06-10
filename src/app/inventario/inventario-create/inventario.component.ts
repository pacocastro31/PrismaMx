import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";

import { InventarioInfo } from '../inventario'
import { InventarioService } from '../inventario.service'

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  inventario: InventarioInfo = new InventarioInfo();

  constructor(private inventarioService: InventarioService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  save(){
    this.inventarioService.createInventario(this.inventario);
  }

  onSubmit() {
    this.save();
    this.clear();
  }

  clear(){
    this.inventario.material = ""
    this.inventario.precioMinuto = ""
    this.inventario.color = ""
    this.inventario.rollos = ""
  }

}
