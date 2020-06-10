import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { CotizacionService } from '../../cotizacion/cotizacion.service';
import { cotizacion } from '../../cotizacion/cotizacion'

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  constructor(private cotizacionService: CotizacionService) { }
  @Input() pedidos: cotizacion;

  ngOnInit(): void {

  }

}
