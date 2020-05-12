import { Component, OnInit, Input } from '@angular/core';
import { ServicioParte1 } from '../serviciosParte1'
import { ServiciosParte1Service } from '../servicios-parte1.service'

@Component({
  selector: 'app-servicios-parte1-detail',
  templateUrl: './servicios-parte1-detail.component.html',
  styleUrls: ['./servicios-parte1-detail.component.css']
})
export class ServiciosParte1DetailComponent implements OnInit {
  @Input() servicio1: ServicioParte1;

  constructor(private servicio1Service: ServiciosParte1Service) { }

  ngOnInit(): void {
  }

  deleteServicio1(){
    this.servicio1Service.deleteServicio(this.servicio1.key).catch(err => console.log(err));
  }

}
