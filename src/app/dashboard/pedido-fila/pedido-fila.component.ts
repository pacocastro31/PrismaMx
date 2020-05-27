import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { cotizacion } from 'src/app/cotizacion/cotizacion';
import { CotizacionService } from '../../cotizacion/cotizacion.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import * as firebase from 'firebase';

@Component({
  selector: 'app-pedido-fila',
  templateUrl: './pedido-fila.component.html',
  styleUrls: ['./pedido-fila.component.css']
})
export class PedidoFilaComponent implements OnInit {

  constructor(private cotizacionService: CotizacionService, private storage: AngularFireStorage) { }

  @Input() pedido: cotizacion;
  @Input() index: any;

  status: any;
  valorReal: any;
  downloadURL: Observable<string>;
  fb;
  img: any;
  tieneImagen: boolean = false;
  imgFile: any = null

  ngOnInit(): void {
    this.status = this.pedido.status;
    this.valorReal = this.pedido.precioReal
    if (this.pedido.tieneImagen){
      this.tieneImagen = true;
      this.img = this.pedido.urlImagenPedido
    }

  }

  updateInfo(){
    this.cotizacionService.updatePedido(this.pedido.key, {precioReal: this.valorReal}).catch(err => console.log(err));
    this.cotizacionService.updatePedido(this.pedido.key, {status: this.status}).catch(err => console.log(err));
    if(this.imgFile){
      this.uploadFile();
    }
    console.log("ASD");
  }

  uploadFile(){

    const filePath = `Pedidos/`+ this.pedido.id;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Pedidos/`+ this.pedido.id, this.imgFile);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            this.img = url;
            console.log(this.img);
            this.cotizacionService.updatePedido(this.pedido.key, {tieneImagen: true, urlImagenPedido: this.img}).catch(err => console.log(err));
          });
        })
      );
  }

  changeFile(event){
    this.imgFile = event.target.files[0];
  }

  changeDown(i){
    var up = "btn-up" + i;
    var down = "btn-down" + i;
    document.getElementById(up).style.display = "none";
    document.getElementById(down).style.display = "inline-block";
  }

  changeUp(i){
    var up = "btn-up" + i;
    var down = "btn-down" + i;
    document.getElementById(up).style.display = "inline-block";
    document.getElementById(down).style.display = "none";
  }
}
