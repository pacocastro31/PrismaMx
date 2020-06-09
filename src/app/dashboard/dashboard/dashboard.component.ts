import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  admin: any
  admin2 = false

  constructor() { }

  Pedidos: any;

  ngOnInit(): void {
    this.admin = false
    this.admin = localStorage.getItem('admin')
    if(this.admin == "admin"){
      this.admin2 = true
    }
  }

  

}
