import { Component, OnInit, Input } from '@angular/core';

import { ContactInfo } from '../contact-info'
import { EditContactInfoService } from '../edit-contact-info.service'
import { map } from 'rxjs/operators';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from 'rxjs/operators';
import { Observable } from "rxjs";

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
  selectedImage: any
  downloadURL: Observable<string>;
  fb: any;
  dwUrl: any;

  constructor(private editContactInfoService: EditContactInfoService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getContactInfo();
  }

  save() {
    this.submitted = true;
    this.editContactInfoService.createContactInfo(this.contactInfo);
  }

  updateInfo(){
    if(this.info[0].name != this.contactInfo.name){
      this.submitted = true;
      this.editContactInfoService.updateContactInfo(this.info[0].key, {name: this.contactInfo.name}).catch(err => console.log(err));
    }
    if(this.info[0].phoneNumber != this.contactInfo.phoneNumber){
      this.submitted = true;
      this.editContactInfoService.updateContactInfo(this.info[0].key, {phoneNumber: this.contactInfo.phoneNumber}).catch(err => console.log(err));
    }
    if(this.info[0].email != this.contactInfo.email){
      this.submitted = true;
      this.editContactInfoService.updateContactInfo(this.info[0].key, {email: this.contactInfo.email}).catch(err => console.log(err));
    }
    if(this.info[0].facebook != this.contactInfo.facebook){
      this.submitted = true;
      this.editContactInfoService.updateContactInfo(this.info[0].key, {facebook: this.contactInfo.facebook}).catch(err => console.log(err));
    }
    if(this.info[0].instagram != this.contactInfo.instagram){
      this.submitted = true;
      this.editContactInfoService.updateContactInfo(this.info[0].key, {instagram: this.contactInfo.instagram}).catch(err => console.log(err));
    }
    if(this.info[0].address != this.contactInfo.address){
      this.submitted = true;
      this.editContactInfoService.updateContactInfo(this.info[0].key, {address: this.contactInfo.address}).catch(err => console.log(err));
    }
    if(this.info[0].sobreNosotros != this.contactInfo.sobreNosotros){
      this.submitted = true;
      this.editContactInfoService.updateContactInfo(this.info[0].key, {sobreNosotros: this.contactInfo.sobreNosotros}).catch(err => console.log(err));
    }
  }

  availForm(){
    this.submitted = false;
  }

  onSubmit() {
    if(this.info == null){
      this.save()
    }
    this.updateInfo()
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
      this.setInfo()
    });
  }

  setInfo(){
    this.contactInfo.name = this.info[0].name
    this.contactInfo.address = this.info[0].address
    this.contactInfo.email = this.info[0].email
    this.contactInfo.facebook = this.info[0].facebook
    this.contactInfo.instagram = this.info[0].instagram
    this.contactInfo.phoneNumber = this.info[0].phoneNumber
    this.contactInfo.sobreNosotros = this.info[0].sobreNosotros
  }

  saveImage(event: any){
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `logo/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`logo/${n}`, file);
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
          this.dwUrl = url;
        }
      });
  }
  
}
