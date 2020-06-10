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
  items = []
  mes = []
  realizados: any
  pagados = []
  totalPagados: any
  ingresos = 0
  validateOptionAnio = false
  validateOptionMes = false
  aux = []

  constructor(private cotizacionService: CotizacionService) { }

  ngOnInit(): void {
    this.items.push('Todos')
    this.mes.push('Todos')
    this.admin = false
    this.admin = localStorage.getItem('admin')
    if(this.admin == "admin"){
      this.admin2 = true
    }
    this.getCustomersList()
  }

  pedidosIngresos(){
    this.pedidos.forEach(element => {
      this.ingresos = +(this.ingresos) + +(element.precioReal)
    });
  }

  pedidosPagados(){
    this.pedidos.forEach(element => {
      if(element.status == 'revision' || element.status == 'produccion' || element.status == 'listo' || element.status == 'entregado'){
        this.pagados.push(element)
      }
    });
    this.totalPagados = this.pagados.length
  }

  validateAnio(anio){
    this.items.forEach(element => {
      if(element.ano == anio){
        this.validateOptionAnio = true
      } else{
        this.validateOptionAnio = false
      }
    });
  }

  setAnio(){
    this.pedidos.forEach(element => {
      this.validateAnio(element.ano)
      if(this.validateOptionAnio == false){
        this.items.push(element.ano)
      }
    });
  }

  validateMes(mes){
    this.mes.forEach(element => {
      if(element.mes == mes){
        this.validateOptionMes = true
      } else{
        this.validateOptionMes = false
      }
    });
  }
  
  setMes(){
    this.pedidos.forEach(element => {
      this.validateMes(element.mes)
      if(this.validateOptionMes == false){
        this.mes.push(element.mes)
      }
    });
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
      console.log(this.pedidos)
      this.realizados = this.pedidos.length
      this.pedidosPagados()
      this.pedidosIngresos()
      this.setAnio()
      this.setMes()
    });
  }

  filtroAnio(value){
    this.aux = this.pedidos
    this.pedidos = []
    if(value == 'Todos'){
      this.pedidos = this.aux
      this.pagados = []
      this.ingresos = 0
      this.pedidosIngresos()
      this.pedidosPagados()
      this.realizados = this.pedidos.length
    }

    this.aux.forEach(element => {
      if(element.ano == value){
        this.pedidos.push(element)
        this.pagados = []
        this.ingresos = 0
        this.pedidosIngresos()
        this.pedidosPagados()
        this.realizados = this.pedidos.length
      }
    });
  }

  filtroMes(value){
    this.aux = this.pedidos
    this.pedidos = []
    if(value == 'Todos'){
      this.pedidos = this.aux
      this.pagados = []
      this.ingresos = 0
      this.pedidosIngresos()
      this.pedidosPagados()
      this.realizados = this.pedidos.length
    }
    
    this.aux.forEach(element => {
      if(element.mes == value){
        this.pedidos.push(element)
        this.pagados = []
        this.ingresos = 0
        this.pedidosIngresos()
        this.pedidosPagados()
        this.realizados = this.pedidos.length
      }
    });
  }

}
