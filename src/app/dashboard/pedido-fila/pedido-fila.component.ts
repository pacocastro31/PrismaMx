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
  img: String;
  tieneImagen: boolean = false;
  imgFile: any = null
  subiendo: boolean = false;

  nombreArch = ""
  fecha: any;

  ngOnInit(): void {
    this.fecha = String(this.pedido.dia) + "-" + String(this.pedido.mes) + "-" + String(this.pedido.ano)
    this.status = this.pedido.status;
    this.valorReal = this.pedido.precioReal
    this.nombreArch = this.pedido.id + '.stl'
    if (this.pedido.tieneImagen){
      this.tieneImagen = true;
      this.img = this.pedido.urlImagen;
    }
  }

  updateInfo(){
    if(this.imgFile != null){
      this.subiendo = true;
      this.uploadFile();
    } else{
      this.subiendo = true;
      this.cotizacionService.updatePedido(this.pedido.key, {precioReal: this.valorReal, status: this.status}).catch(err => console.log(err)).finally( () => {
        location.reload();
      });
    }
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
            this.cotizacionService.updatePedido(this.pedido.key, {precioReal: this.valorReal, status: this.status, tieneImagen: true,
              urlImagen: this.fb
            }).catch(err => console.log(err)).finally( () => {
              location.reload();
            }
            );
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
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

  downloadFile(){
    const filePath = `RoomsImages/`+ this.pedido.id + '.stl';
    const fileRef = this.storage.ref(filePath);
    fileRef.getDownloadURL().subscribe(url => {
      console.log(url);
      var link = document.createElement('a');
      link.download = url;
      link.href = url;  
      link.click();
      });
  }
}
