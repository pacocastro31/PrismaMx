import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  public modelObj: Object = { placeholder: "Enter employee name" };

  admin: any
  admin2 = false

  constructor() {}

  ngOnInit(): void {
    this.admin = false
    this.admin = localStorage.getItem('admin')
    if(this.admin == "admin"){
      this.admin2 = true
    }
  }

}
