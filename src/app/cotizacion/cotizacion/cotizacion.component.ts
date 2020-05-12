import { Component, OnInit } from '@angular/core';
import { ApiService } from "./services/api.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import{cotizacion} from "../cotizacion";
import{CotizacionService} from "../cotizacion.service";

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  selectedMaterial: string = "";
  selectedColor: string = "";
  userName: string = "";
  userSecondName: string = "";
  userMail: string = "";
  fecha: string = "";
  id : string = "";
  cotizacion: cotizacion = new cotizacion();

  getValues(event: any){
    this.userName = event.target.value;
  }

  saveValues(){
    this.generateId();
    this.generateDate();
    this.cotizacionService.createCotizacion(this.cotizacion, this.id,this.fecha);

  }
  generateId(){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&=';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result);
    this.id = result;
  }

  generateDate(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log(dateTime);
    this.fecha = dateTime;
  

  }
  getValuesSecondName(event:any){
    this.userSecondName = event.target.value;
    
  }

  getValueMail(event:any){
    this.userMail = event.target.value;
  }

  getConsoleValue(event:any){
    console.log(this.userName , this.userSecondName)
  }


  selectChangeHandler (event: any){
    this.selectedMaterial = event.target.value;
  }

  selectColorHandler (event: any){
    this.selectedColor = event.target.value;
  }

  title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  constructor(private Api: ApiService, private storage: AngularFireStorage, private cotizacionService: CotizacionService) {}
  ngOnInit() {}

  upLoadInfo(event){
    
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
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

  onFileSelected(event) {
    const price = "500";
    document.getElementById("priceFile").innerHTML = price;
    
  }

}
