import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any
  password: any

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.usuario != "admin" && this.password != "admin"){
      alert("Usuario y/o Contraseña incorrecto")
    } else{
      localStorage.setItem("admin", this.usuario)
      this.router.navigate(['admin']);
    }
  }

}
