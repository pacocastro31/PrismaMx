import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { map } from 'rxjs/operators';

import { ContactUsInfo } from '../contactUs'
import { ContactUsService } from '../contact-us.service'

@Component({
  selector: 'app-contact-us-admin',
  templateUrl: './contact-us-admin.component.html',
  styleUrls: ['./contact-us-admin.component.css']
})
export class ContactUsAdminComponent implements OnInit {

  contactUs: ContactUsInfo = new ContactUsInfo();
  info: any;
  submitted = false;

  constructor(private contactUsService: ContactUsService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getContactUsInfo();
  }

  save() {
    this.submitted = true;
    this.contactUsService.createContactUs(this.contactUs);
  }

  onSubmit() {
    if(this.info == null){
      this.save()
    }
    this.updateInfo()
  }

  setInfo(){
    this.contactUs.titulo = this.info[0].titulo
    this.contactUs.tituloDescripcion = this.info[0].tituloDescripcion
    this.contactUs.cta = this.info[0].cta
    this.contactUs.placeHolderNombre = this.info[0].placeHolderNombre
    this.contactUs.placeHolderCorreo = this.info[0].placeHolderCorreo
    this.contactUs.subtitulo = this.info[0].subtitulo
    this.contactUs.descripcion = this.info[0].descripcion
    this.contactUs.linkCta = this.info[0].linkCta
    this.contactUs.placeHolderApellido = this.info[0].placeHolderApellido
    this.contactUs.placeHolderMensaje = this.info[0].placeHolderMensaje
  }

  getContactUsInfo(){
    this.contactUsService.getContactUsInfo().snapshotChanges().pipe(
      map(changes=>
        changes.map(c =>
            ({key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(Cinfo => {
      this.info = Cinfo;
      this.setInfo()
    });
  }

  updateInfo(){
    if(this.info[0].titulo != this.contactUs.titulo){
      this.submitted = true;
      this.contactUsService.updateContactUs(this.info[0].key, {titulo: this.contactUs.titulo}).catch(err => console.log(err));
    }
    if(this.info[0].tituloDescripcion != this.contactUs.tituloDescripcion){
      this.submitted = true;
      this.contactUsService.updateContactUs(this.info[0].key, {tituloDescripcion: this.contactUs.tituloDescripcion}).catch(err => console.log(err));
    }
    if(this.info[0].cta != this.contactUs.cta){
      this.submitted = true;
      this.contactUsService.updateContactUs(this.info[0].key, {cta: this.contactUs.cta}).catch(err => console.log(err));
    }
    if(this.info[0].placeHolderNombre != this.contactUs.placeHolderNombre){
      this.submitted = true;
      this.contactUsService.updateContactUs(this.info[0].key, {placeHolderNombre: this.contactUs.placeHolderNombre}).catch(err => console.log(err));
    }
    if(this.info[0].placeHolderCorreo != this.contactUs.placeHolderCorreo){
      this.submitted = true;
      this.contactUsService.updateContactUs(this.info[0].key, {placeHolderCorreo: this.contactUs.placeHolderCorreo}).catch(err => console.log(err));
    }
    if(this.info[0].subtitulo != this.contactUs.subtitulo){
      this.submitted = true;
      this.contactUsService.updateContactUs(this.info[0].key, {subtitulo: this.contactUs.subtitulo}).catch(err => console.log(err));
    }
    if(this.info[0].descripcion != this.contactUs.descripcion){
      this.submitted = true;
      this.contactUsService.updateContactUs(this.info[0].key, {descripcion: this.contactUs.descripcion}).catch(err => console.log(err));
    }
    if(this.info[0].linkCta != this.contactUs.linkCta){
      this.submitted = true;
      this.contactUsService.updateContactUs(this.info[0].key, {linkCta: this.contactUs.linkCta}).catch(err => console.log(err));
    }
    if(this.info[0].placeHolderApellido != this.contactUs.placeHolderApellido){
      this.submitted = true;
      this.contactUsService.updateContactUs(this.info[0].key, {placeHolderApellido: this.contactUs.placeHolderApellido}).catch(err => console.log(err));
    }
    if(this.info[0].placeHolderMensaje != this.contactUs.placeHolderMensaje){
      this.submitted = true;
      this.contactUsService.updateContactUs(this.info[0].key, {placeHolderMensaje: this.contactUs.placeHolderMensaje}).catch(err => console.log(err));
    }
  }

  availForm(){
    this.submitted = false;
  }

}
