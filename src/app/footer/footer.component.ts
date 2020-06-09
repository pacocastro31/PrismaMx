import { Component, OnInit } from '@angular/core';

import { ContactInfo } from '../admin/edit-info/contact-info'
import { EditContactInfoService } from '../admin/edit-info/edit-contact-info.service'

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  info: any

  constructor(private editContactInfoService: EditContactInfoService) { }

  ngOnInit(): void {
    this.getContactInfo();
  }

  getContactInfo(){
    this.editContactInfoService.getContactInfo().snapshotChanges().pipe(
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
