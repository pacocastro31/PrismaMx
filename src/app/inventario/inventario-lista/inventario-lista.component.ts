import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../inventario.service'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-inventario-lista',
  templateUrl: './inventario-lista.component.html',
  styleUrls: ['./inventario-lista.component.css']
})
export class InventarioListaComponent implements OnInit {

  inventarios: any

  constructor(private inventarioService: InventarioService) { }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(){
    this.inventarioService.getInventarioInfo().snapshotChanges().pipe(
      map(changes=>
        changes.map(c =>
            ({key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(Cinfo => {
      this.inventarios = Cinfo;
    });
  }

}
