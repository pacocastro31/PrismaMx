import { Component, OnInit } from '@angular/core';
import { ServicioParte1 } from '../serviciosParte1'
import { ServiciosParte1Service } from '../servicios-parte1.service'

@Component({
  selector: 'app-servicios-parte1',
  templateUrl: './servicios-parte1.component.html',
  styleUrls: ['./servicios-parte1.component.css']
})
export class ServiciosParte1Component implements OnInit {

  submitted = false;
  servicioParte1: ServicioParte1 = new ServicioParte1();

  constructor(private servicioParte1Service: ServiciosParte1Service) { }

  ngOnInit(): void {
  }

  save(){
    this.submitted = true;
    this.servicioParte1Service.createServicio1(this.servicioParte1);
  }

  onSubmit() {
    this.save();
    this.clear();
  }

  clear(){
    this.servicioParte1.title = ""
    this.servicioParte1.description = ""
    this.servicioParte1.list = ""
  }

}
