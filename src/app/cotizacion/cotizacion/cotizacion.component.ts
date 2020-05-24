import { Component, OnInit } from '@angular/core';
import { ApiService } from "./services/api.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import{cotizacion} from "../cotizacion";
import{CotizacionService} from "../cotizacion.service";
import { element } from 'protractor';

declare var $: any;
@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  selectedMaterial: string = "";
  selectedColor: string = "";
  selectedFill : string = "";
  selectedQuality: string = "";
  selectedQuantity: string = "";
  userName: string = "";
  userMail: string = "";
  fecha: string = "";
  id : string = "";

  
  cotizacion: cotizacion = new cotizacion();


  getValues(event: any){
    this.userName = event.target.value;
  }

  saveValues(){
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    var mail = (<HTMLInputElement>document.getElementById("mail")).value; 
   


    if(name != "" && mail != "") {
      this.generateId();
      this.generateDate();
      this.cotizacionService.createCotizacion(this.cotizacion, this.id,this.fecha);

      $("#myModal2").modal('show');      
    }
    else{
      alert("Favor de llenar los campos de nombre y/o mail");
    }



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
    var dateTime = date;
    console.log(dateTime);
    this.fecha = dateTime;
  

  }

  getValueMail(event:any){
    this.userMail = event.target.value;
  }

  getUserName(event : any){
    this.userName = event.target.value;
  }

  selectChangeHandler (event: any){
    var material = (<HTMLSelectElement>document.getElementById("materialLb")).value; 
    if(material != ""){
      this.selectedMaterial = event.target.value;
    }
    console.log(material);

  }

  selectColorHandler (event: any){
    var color = (<HTMLSelectElement>document.getElementById("colorLb")).value; 
    if(color != ""){
      this.selectedColor = event.target.value;
    }
    console.log(color);
  }

  selectQualityHandler (event: any){
    var calidad = (<HTMLSelectElement>document.getElementById("calidadLb")).value; 
    if(calidad != ""){
      this.selectedQuality = event.target.value;
    }
    console.log(calidad)
  }

  selectFillHandler(event: any){
    var relleno = (<HTMLSelectElement>document.getElementById("rellenoLB")).value; 
    if(relleno != ""){
      this.selectedFill = event.target.value;
    }
    console.log(relleno);
  }

  selectQuantityHandler(event: any){
    var cantidad = (<HTMLSelectElement>document.getElementById("cantidadLB")).value; 
    if(cantidad != ""){
      this.selectedQuantity = event.target.value;
    }
    console.log(cantidad);
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
