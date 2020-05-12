import { Component, OnInit, SimpleChanges } from '@angular/core';
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

  pedidos: any;

  ngOnInit(): void {
    this.getCustomersList();
  }

  getCustomersList(){
    this.cotizacionService.getPedidos().snapshotChanges().pipe(
      map(changes=>
        changes.map(c =>
            ({key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(pedidos => {
      this.pedidos = pedidos;
    });
  }
}
