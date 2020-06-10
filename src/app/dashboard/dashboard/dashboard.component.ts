import { Component, OnInit } from '@angular/core';
import { CotizacionService } from '../../cotizacion/cotizacion.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  admin: any
  admin2 = false
  pedidos: any
  items = [{'ano': '1997'},{'ano': '1998'},{'ano': '1999'}]

  constructor(private cotizacionService: CotizacionService) { }

  ngOnInit(): void {
    this.admin = false
    this.admin = localStorage.getItem('admin')
    if(this.admin == "admin"){
      this.admin2 = true
    }
    this.getCustomersList()
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
