import { Component, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { CotizacionService } from '../../cotizacion/cotizacion.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  
  pedidos: any
  status = ['Pendiente', 'En proceso', 'Terminado']


  constructor(private cotizacionService: CotizacionService) { }

  ngOnInit(): void {
    this.getCustomersList();
  }

  ngOnChanges(changes: SimpleChanges){
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
