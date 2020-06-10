import { Component, OnInit, Input } from '@angular/core';
import { InventarioInfo } from '../inventario'
import { InventarioService } from '../inventario.service'

@Component({
  selector: 'app-inventario-detail',
  templateUrl: './inventario-detail.component.html',
  styleUrls: ['./inventario-detail.component.css']
})
export class InventarioDetailComponent implements OnInit {
  @Input() inventario: InventarioInfo;
  inv: InventarioInfo = new InventarioInfo();
  material: any
  rollos: any

  constructor(private inventarioService: InventarioService) { }

  ngOnInit(): void {
  }

  deleteInventario(){
    this.inventarioService.deleteInventario(this.inventario.key).catch(err => console.log(err));
  }

  update(){
    this.showSnackbar()
    this.inventarioService.updateInventario(this.inventario.key, {precioMinuto: this.inventario.precioMinuto}).catch(err => console.log(err));
    this.inventarioService.updateInventario(this.inventario.key, {rollos: this.inventario.rollos}).catch(err => console.log(err));
  }

  showSnackbar(){
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
}
