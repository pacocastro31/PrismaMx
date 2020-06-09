import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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

  adminFunc(){
    this.router.navigate(['admin']);
  }

}
