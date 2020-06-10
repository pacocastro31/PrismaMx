import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { ContactUsInfo } from '../admin/contactUs/contactUs'
import { ContactUsService } from '../admin/contactUs/contact-us.service'
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  info: any;
  nombre =  "";
  apellido =  "";
  correo = "";
  mensaje = "";

  constructor(private contactUsService: ContactUsService) { }

  ngOnInit(): void {
    this.getContactUsInfo();
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
    });
  }

  enviarCorreo(){
    var templateParams = {
      to_name_value: 'prismai3d@gmail.com',
      from_name: this.correo,
      message_html: 'El cliente '+ this.nombre + ' ' + this.apellido + ' envía el siguiente mensaje: ' + this.mensaje
    };
    emailjs.init("user_YVQlRv5P0X8LNqc4AXTo9");
    emailjs.send('gmail', 'template_3y8KxQsG', templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      console.log('FAILED...', error);
    });

    var templateParams = {
      to_name_value: this.correo,
      from_name: "prismai3d@gmail.com",
      message_html:  this.nombre + ' ' + this.apellido + ' has enviado el siguiente mensaje a Prisma Impresiones 3D: ' + this.mensaje
    };
    emailjs.init("user_YVQlRv5P0X8LNqc4AXTo9");
    emailjs.send('gmail', 'template_3y8KxQsG', templateParams)
    .then(function(response) {
      alert("Mensaje Enviado!");
      location.reload();
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      console.log('FAILED...', error);
    });
  }

}
