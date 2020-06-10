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
  anos = []
  mes = []
  realizados: any
  pagados = []
  totalPagados = 0
  ingresos = 0
  disableMes = true;
  selectedMonth: any;
  selectedYear: any;
  pedidosFiltrados: any;
  pedidosFiltradosConMes: any;
  pedidosFinal: any;


  constructor(private cotizacionService: CotizacionService) { }

  ngOnInit(): void {
    this.anos.push('Todos')
    this.mes.push('Todos')
    this.admin = false
    this.admin = localStorage.getItem('admin')
    if(this.admin == "admin"){
      this.admin2 = true
    }
    this.getCustomersList();
  }

  llenarAnos(){
    this.pedidos.forEach(p => {
      if (!this.anos.includes(p.ano)){
        this.anos.push(p.ano);
      }
    });
  }

  llenarMeses(){
    this.mes = ['Todos']
    this.pedidosFiltrados.forEach(p => {
      if (!this.mes.includes(p.mes)){
        this.mes.push(p.mes);
      }
    });
  }

  filtroFinal(){

  }

  pedidosPagados(){
    this.pedidos.forEach(element => {
      if(element.status == 'revision' || element.status == 'produccion' || element.status == 'listo' || element.status == 'entregado'){
        this.pagados.push(element)
      }
    });
    this.totalPagados = this.pagados.length
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
      this.pedidosFiltrados = pedidos;
      this.realizados = this.pedidos.length;
      this.llenarAnos();
      this.filtroAnio('Todos');
    });
  }

  filtroAnio(value){
   if(value != 'Todos'){
      this.pedidosFiltrados = this.pedidos
      this.selectedYear = value;
      this.pedidosFiltrados = this.pedidosFiltrados.filter( p => p.ano == this.selectedYear);
      this.pedidosFinal = this.pedidosFiltrados;
      this.llenarMeses();
      this.disableMes = false;
      this.filtroMes(null);
   } else {
     this.mes = ['Todos'];
     this.disableMes = true;
     this.pedidosFinal = this.pedidos
     this.calcularCosas();
   }
  }

  filtroMes(value){
    if(value != null && value != 'TODOS'){
      this.selectedMonth = value;
      this.pedidosFiltradosConMes = this.pedidosFiltrados.filter( p => p.mes == this.selectedMonth);
      this.pedidosFinal = this.pedidosFiltradosConMes;
    } else {
      this.pedidosFinal = this.pedidosFiltrados;
    }
    this.totalPagados = 0;
    this.ingresos = 0;
    this.calcularCosas();
  }

  calcularCosas(){
    console.log(this.pedidosFinal);
    this.realizados = this.pedidosFinal.length;
    this.pedidosFinal.forEach(element => {
      if(element.status == 'revision' || element.status == 'produccion' || element.status == 'listo' || element.status == 'entregado'){
        this.totalPagados = this.totalPagados + 1;
        this.ingresos += parseInt(element.precioReal);
      }
    });
  }
}
