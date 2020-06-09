import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { ContactUsInfo } from '../admin/contactUs/contactUs'
import { ContactUsService } from '../admin/contactUs/contact-us.service'

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  info: any;

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

}
