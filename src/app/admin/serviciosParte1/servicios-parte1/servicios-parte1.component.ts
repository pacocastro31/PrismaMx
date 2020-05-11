import { Component, OnInit } from '@angular/core';
import { ServicioParte1 } from '../serviciosParte1'
import { ServiciosParte1Service } from '../servicios-parte1.service'

import { map } from 'rxjs/operators';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from 'rxjs/operators';
import { Observable } from "rxjs";

@Component({
  selector: 'app-servicios-parte1',
  templateUrl: './servicios-parte1.component.html',
  styleUrls: ['./servicios-parte1.component.css']
})
export class ServiciosParte1Component implements OnInit {

  submitted = false;
  servicioParte1: ServicioParte1 = new ServicioParte1();

  selectedImage: any
  downloadURL: Observable<string>;
  fb: any;
  dwUrl: any;

  constructor(private servicioParte1Service: ServiciosParte1Service, private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  save(){
    this.submitted = true;
    this.servicioParte1Service.createServicio1(this.servicioParte1, this.fb);
  }

  onSubmit() {
    this.save();
    this.clear();
  }

  clear(){
    this.servicioParte1.title = ""
    this.servicioParte1.description = ""
    this.servicioParte1.list = ""
    this.servicioParte1.imagen = null
  }

  saveImage(event: any){
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `admin/servicios1/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`admin/servicios1/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

}
