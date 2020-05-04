import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
  template: `
    <div class="multiline">
      <ejs-textbox
        #default
        [multiline]="true"
        floatLabelType="Auto"
        placeholder="Enter your address"
        (input)="inputHandler($event)"
      ></ejs-textbox>
    </div>
  `,
})
export class AdminComponent implements OnInit {
  public modelObj: Object = { placeholder: "Enter employee name" };
  constructor() {}

  ngOnInit(): void {}
}
