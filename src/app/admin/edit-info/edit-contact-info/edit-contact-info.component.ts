import { Component, OnInit, Input } from '@angular/core';

import { ContactInfo } from '../contact-info'
import { EditContactInfoService } from '../edit-contact-info.service'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-contact-info',
  templateUrl: './edit-contact-info.component.html',
  styleUrls: ['./edit-contact-info.component.css']
})
export class EditContactInfoComponent implements OnInit {
  @Input() contact: ContactInfo;

  contactInfo: ContactInfo = new ContactInfo();
  submitted = false;
  info: any

  constructor(private editContactInfoService: EditContactInfoService) { }

  ngOnInit(): void {
    this.getContactInfo();
  }

  save() {
    this.submitted = true;
    this.editContactInfoService.createContactInfo(this.contactInfo)
  }

  updateInfo(){
  }

  availForm(){
    this.submitted = false;
  }

  onSubmit() {
    if(this.info == null){
      this.save()
    }
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
