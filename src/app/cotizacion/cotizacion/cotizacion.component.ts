import { Component, OnInit } from '@angular/core';
import { ApiService } from "./services/api.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import{cotizacion} from "../cotizacion";
import{CotizacionService} from "../cotizacion.service";
import { element } from 'protractor';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

import { InventarioInfo } from '../../inventario/inventario'
import { InventarioService } from '../../inventario/inventario.service'

declare var $: any;
//var mail = (<HTMLInputElement>document.getElementById("mail")).value;
var datos
var imagen = 0;
var idResultado ;
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
  dia = 0;
  mes = 0;
  ano = 0;
  id : string = "";
  file: any;
  nombreArchivo : string = "";


  cotizacion: cotizacion = new cotizacion();

  inventarios: any

  getValues(event: any){
    this.userName = event.target.value;
  }
  verificaImagen(){
    var name = (<HTMLInputElement>document.getElementById("file")).value;
    if(imagen != 0){
      $("#myModal1").modal('show');
      //console.log(name);

    }
    else{
      alert("Favor de ingresar un modelo en examinar..");
    }
  }
  saveValues(){
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    var mail = (<HTMLInputElement>document.getElementById("mail")).value;
    this.generateId();

    var templateParams = {
      to_name_value: mail,
      from_name: 'noe0479@gmail.com',
      message_html: idResultado
    };
    datos = templateParams


    if(name != "" && mail != "") {

      this.generateDate();
      this.upLoadInfo();
      this.sendEmail($);

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
    //console.log(result);
    idResultado = result;
    this.id = result;
  }


  generateDate(){
    var today = new Date();
    this.ano = today.getFullYear();
    this.mes = today.getMonth()+1;
    this.dia = today.getDate();

  }


  public sendEmail(e: Event) {
    emailjs.init("user_YVQlRv5P0X8LNqc4AXTo9");
    emailjs.send('gmail', 'template_3y8KxQsG', datos)
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
    var etiqueta = (<HTMLSelectElement>document.getElementById("materialModal"))
    if(material != ""){
      this.selectedMaterial = event.target.value;
      etiqueta.value = event.target.value;
    }
    else{
      this.selectedMaterial = "";
    }
    //console.log(material);

  }

  selectColorHandler (event: any){
    var color = (<HTMLSelectElement>document.getElementById("colorLb")).value;
    var etiqueta = (<HTMLSelectElement>document.getElementById("colormodal"))
    if(color != ""){
      this.selectedColor = event.target.value;
      etiqueta.value = event.target.value;
    }
    else{
      this.selectedColor = "";
    }
    //console.log(color);
  }

  selectQualityHandler (event: any){
    var calidad = (<HTMLSelectElement>document.getElementById("calidadLb")).value;
    var etiqueta = (<HTMLSelectElement>document.getElementById("calidadModal"))
    if(calidad != ""){
      this.selectedQuality = event.target.value;
      etiqueta.value = event.target.value;
    }
    else{
      this.selectedQuality = "";
    }
    //console.log(calidad)
  }

  selectNameFile(event: any){
    var name = (<HTMLInputElement>document.getElementById("file")).value;
    this.nombreArchivo = event.target.value
  }

  selectFillHandler(event: any){
    var relleno = (<HTMLSelectElement>document.getElementById("rellenoLB")).value;
    var etiqueta = (<HTMLSelectElement>document.getElementById("rellenoModal"))
    if(relleno != ""){
      this.selectedFill = event.target.value;
      etiqueta.value = event.target.value;
    }
    else{
      this.selectedFill = "";
    }
    //console.log(relleno);
  }

  selectQuantityHandler(event: any){
    var cantidad = (<HTMLSelectElement>document.getElementById("cantidadLB")).value;
    var etiqueta = (<HTMLSelectElement>document.getElementById("cantidadModal"))
    if(cantidad != ""){
      this.selectedQuantity = event.target.value;
      etiqueta.value = event.target.value;
    }
    else{
      this.selectedQuantity = "";
    }
    //console.log(cantidad);
  }


  title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  constructor(private Api: ApiService,
  private storage: AngularFireStorage,
  private cotizacionService: CotizacionService,
  private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.getInfo();
  }

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
            this.cotizacionService.createCotizacion(this.cotizacion, this.id,this.dia,this.mes,this.ano);
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
    //console.log("si");
    imagen = 1;
    console.log(imagen);
    this.file = event.target.files[0];
    let iframe = document.getElementById('vs_iframe') as HTMLIFrameElement
	  iframe.contentWindow.postMessage({msg_type:'load', file:this.file}, '*');
    iframe.contentWindow.postMessage({msg_type:'get_info'}, '*');
    document.defaultView.addEventListener("message", this.receiveMessage, false);
  }

  receiveMessage(e) {
    if ((e.origin=="https://www.viewstl.com")&&(e.data.msg_type)) {
      if (e.data.msg_type=='info') {
        alert("Model filename: "+e.data.filename);
        alert("Volume: "+e.data.volume);
        alert("x: "+e.data.x);
        alert("y: "+e.data.y);
        alert("z: "+e.data.z);
        alert("area: "+e.data.area);
      }
    }
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
      console.log(this.inventarios);
    });
  }

}
