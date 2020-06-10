import { Component, OnInit, Input } from '@angular/core';

import { ContactInfo } from '../admin/edit-info/contact-info'
import { EditContactInfoService } from '../admin/edit-info/edit-contact-info.service'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Input() contact: ContactInfo;

  contactInfo: ContactInfo = new ContactInfo();
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
