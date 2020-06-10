import { Component, OnInit } from '@angular/core';
import { ApiService } from "./services/api.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import{cotizacion} from "../cotizacion";
import{CotizacionService} from "../cotizacion.service";
import { element } from 'protractor';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

declare var $: any;

var templateParams = {
  to_name: 'a00949282@itesm.mx',
  from_name: 'noe0479@gmail.com',
  message_html: 'Please Find out the attached file'
};

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
  file: any;


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
      this.upLoadInfo();
      this.sendEmail($);
      this.cotizacionService.createCotizacion(this.cotizacion, this.id,this.fecha);

      $("#myModal3").modal('show');
      //alert("Si");
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


  public sendEmail(e: Event) {
    emailjs.init("user_YVQlRv5P0X8LNqc4AXTo9");
    emailjs.send('gmail', 'template_3y8KxQsG', templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      console.log('FAILED...', error);
    });
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

  upLoadInfo(){
    const filePath = `RoomsImages/`+this.id + '.stl';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/` + this.id + '.stl', this.file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            this.cotizacionService.createCotizacion(this.cotizacion, this.id,this.fecha);
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
    this.file = event.target.files[0];
  }

}
