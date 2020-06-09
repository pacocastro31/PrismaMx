import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  admin: any
  admin2 = false

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.admin = false
    this.admin = localStorage.getItem('admin')
    if(this.admin == "admin"){
      this.admin2 = true
    }
  }

  cerrarSesion(){
    localStorage.clear()
    this.router.navigate(['login']);
  }

}
