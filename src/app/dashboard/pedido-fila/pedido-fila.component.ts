import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { cotizacion } from 'src/app/cotizacion/cotizacion';
import { CotizacionService } from '../../cotizacion/cotizacion.service';

@Component({
  selector: 'app-pedido-fila',
  templateUrl: './pedido-fila.component.html',
  styleUrls: ['./pedido-fila.component.css']
})
export class PedidoFilaComponent implements OnInit {

  constructor(private cotizacionService: CotizacionService) { }

  @Input() pedido: cotizacion;
  @Input() index: any;
  
  status: any;
  valorReal: any;

  ngOnInit(): void {
    this.status = this.pedido.status;
    this.valorReal = this.pedido.precioReal
    console.log(this.pedido)
  }

  changeRealValue(){
    this.cotizacionService.updatePedido(this.pedido.key, {precioReal: this.valorReal}).catch(err => console.log(err));
  }

  changeStatus(){
    this.cotizacionService.updatePedido(this.pedido.key, {status: this.status}).catch(err => console.log(err));
  }
}
