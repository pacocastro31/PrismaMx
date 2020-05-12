import { Component, OnInit } from '@angular/core';
import { ServicioParte1 } from '../serviciosParte1'
import { ServiciosParte1Service } from '../servicios-parte1.service'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-servicios-parte1-list',
  templateUrl: './servicios-parte1-list.component.html',
  styleUrls: ['./servicios-parte1-list.component.css']
})
export class ServiciosParte1ListComponent implements OnInit {

  servicios: any

  constructor(private servicio1Service: ServiciosParte1Service) { }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(){
    this.servicio1Service.getServicioInfo().snapshotChanges().pipe(
      map(changes=>
        changes.map(c =>
            ({key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(Cinfo => {
      this.servicios = Cinfo;
    });
  }

}
