import { Component, OnInit } from "@angular/core";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";
import { map } from 'rxjs/operators';
import { AboutUsInfo } from "../aboutUs";
import { AboutUsService } from "../about-us.service";

@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.css"],
})
export class AboutUsComponent implements OnInit {
  downloadURL: Observable<string>;
  fb: any;
  aboutUs: AboutUsInfo = new AboutUsInfo();
  info: any;

  constructor(private aboutUsService: AboutUsService,private storage: AngularFireStorage) {}

  ngOnInit(): void {
    this.getAboutUsInfo();
  }

  save() {
    this.aboutUsService.createAboutUs(this.aboutUs, this.fb);
  }

  onSubmit() {
    if(this.info == null){
      this.save()
    }
    this.updateInfo()
  }

  showSnackbar(){
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  saveImage(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `admin/aboutUs/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`admin/aboutUs/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }

  setInfo(){
    this.aboutUs.titulo = this.info[0].titulo
    this.aboutUs.parrafo1 = this.info[0].parrafo1
    this.aboutUs.parrafo2 = this.info[0].parrafo2
  }

  getAboutUsInfo(){
    this.aboutUsService.getAboutUsInfo().snapshotChanges().pipe(
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
    if(this.info[0].titulo != this.aboutUs.titulo){
      this.aboutUsService.updateAboutUs(this.info[0].key, {titulo: this.aboutUs.titulo}).catch(err => console.log(err));
    }
    if(this.info[0].parrafo1 != this.aboutUs.parrafo1){
      this.aboutUsService.updateAboutUs(this.info[0].key, {parrafo1: this.aboutUs.parrafo1}).catch(err => console.log(err));
    }
    if(this.info[0].parrafo2 != this.aboutUs.parrafo2){
      this.aboutUsService.updateAboutUs(this.info[0].key, {parrafo2: this.aboutUs.parrafo2}).catch(err => console.log(err));
    }
  }
}
