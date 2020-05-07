import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  public modelObj: Object = { placeholder: "Enter employee name" };
  constructor() {}

  ngOnInit(): void {}

}
