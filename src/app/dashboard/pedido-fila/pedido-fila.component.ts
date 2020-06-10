import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { cotizacion } from 'src/app/cotizacion/cotizacion';
import { CotizacionService } from '../../cotizacion/cotizacion.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import * as firebase from 'firebase';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { ResourceLoader } from '@angular/compiler';

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
  entregado = true;
  nombreArch = ""
  fecha: any;

  ngOnInit(): void {
    if(this.pedido.status == 'entregado'){
      this.entregado = false
    }
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
      this.update({precioReal: this.valorReal, status: this.status});
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
            this.update({precioReal: this.valorReal, status: this.pedido.status, tieneImagen: true,
              urlImagen: this.fb})
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

  update(obj){
    this.cotizacionService.updatePedido(this.pedido.key, obj).catch(err => console.log(err)).finally( );
    this.enviaEmail();
    location.reload();
  }

  enviaEmail(){
    console.log("asd");
    console.log(this.pedido.mail)
    var templateParams = {
      to_name_value: this.pedido.mail,
      from_name: 'prismai3d@gmail.com',
      message_html: 'Su pedido con código: '+ this.pedido.id + ' ha pasado del estado ' + this.getStatus(this.pedido.status) + ' al estado ' + this.getStatus(this.status)
    };
    emailjs.init("user_YVQlRv5P0X8LNqc4AXTo9");
    emailjs.send('gmail', 'template_3y8KxQsG', templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      console.log('FAILED...', error);
    });
  }

  getStatus(status){
    switch (status) {
      case 'pendiente':
        return'Cotizando';
      case "espera":
        return 'A espera de pago';
      case "revision":
        return 'En revisión';
      case "produccion":
        return 'En producción';
      case "listo":
        return 'Listo';
      default:
        return 'Entregado'
    }
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
