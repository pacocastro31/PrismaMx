import { Component, OnInit } from '@angular/core';
import { CotizacionService } from '../cotizacion/cotizacion.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-ver-pedidos',
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.css']
})
export class VerPedidosComponent implements OnInit {

  constructor(private cotizacionService: CotizacionService, private storage: AngularFireStorage) { }

  pedidoExiste = false
  idPedido: any
  pedidos = []
  pedido: any;
  fecha: any;
  status: String;
  downloadURL: Observable<string>;
  nombreArchivo: String;
  imgFile: any;
  showPago: boolean = false;
  subiendo = false;
  tieneImagen = false;
  img: string;
  mensaje: string;
  dimensionFinal: string

  ngOnInit(): void {
    console.log(this.dimensionFinal);
    console.log("un mensaje cualquiera");
  }

  getPedidos(){
    this.cotizacionService.getPedidos().snapshotChanges().pipe(
      map(changes=>
        changes.map(c =>
            ({key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(pedidos => {
      this.pedidos = pedidos;
      this.filterPedidos();
    });
  }

  filterPedidos(){
    console.log(this.idPedido)
    for (let p of this.pedidos) {
      if (p.id == this.idPedido) {
        if (p.status == 'espera'){
          this.showPago = true;
        }
        this.tieneImagen = p.tieneImagen
        this.img = p.urlImagen
        this.pedido = p;
        this.dimensionFinal = String(this.pedido.valX.toFixed(2)) + 'mm, ' + String(this.pedido.valY.toFixed(2)) + 'mm, ' + String(this.pedido.valZ.toFixed(2)) + 'mm.' 
        this.fecha = String(this.pedido.dia) + "-" + String(this.pedido.mes) + "-" + String(this.pedido.ano)
        this.getStatus();
        this.nombreArchivo = this.idPedido + '.stl'
        this.pedidoExiste = true;
        break;
      }
    }
  }

  getStatus(){
    switch (this.pedido.status) {
      case 'pendiente':
        this.status = 'Cotizando';
        this.mensaje = 'El modelo está siendo cotizado por nuestro equipo. Se le enviará un correo con el precio real de la impresión.';
        break;
      case "espera":
        this.status = 'A espera de pago';
        this.mensaje = 'Su pedido se encuentra en espera de pago. Suba una foto de su recibo de pago y seleccione Confirmar Pago para continuar el proceso de producción.';
        break;
      case "revision":
        this.status = 'En revisión';
        this.mensaje = 'El pago está siendo revisado por nuestro equipo. En cuanto esté confirmado, se iniciará la producción de la pieza.';
        break;
      case "produccion":
        this.status = 'En producción';
        this.mensaje = 'Su pieza está siendo impresa por nuestro equipo.'
        break;
      case "listo":
        this.status = 'Listo';
        this.mensaje = 'Su pieza está lista. Nuestro equipo le contactará en breve por correo para definir los detalles de la entrega.'
        break;
      default:
        this.status = 'Entregado'
        this.mensaje = 'El pedido ha sido entregado. ¡Gracias por confiar en nosotros!'
        break;
    }
  }
  
  changeFile(event){
    this.imgFile = event.target.files[0];
  }

  uploadFile(){
    this.subiendo = true
    const filePath = `Pagos/`+ this.pedido.id;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Pagos/`+ this.pedido.id, this.imgFile);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.cotizacionService.updatePedido(this.pedido.key, {
              urlPago: url,
              status: 'revision'
            }).catch(err => console.log(err)).finally( () => {
              this.showPago = false;
              this.subiendo = false;
              this.enviaEmail();
              this.mensaje = 'El pago está siendo revisado por nuestro equipo. En cuanto esté confirmado, se iniciará la producción de la pieza.';
            })
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  enviaEmail(){
    var templateParams = {
      to_name_value: 'prismai3d@gmail.com',
      from_name: 'Prisma Impresiones 3D',
      message_html: 'El cliente '+ this.pedido.nombre + ' ha realizado el pago del pedido ' + this.pedido.id
    };
    emailjs.init("user_YVQlRv5P0X8LNqc4AXTo9");
    emailjs.send('gmail', 'template_3y8KxQsG', templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      console.log('FAILED...', error);
    });
  }
}
