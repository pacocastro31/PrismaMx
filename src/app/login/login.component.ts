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
      this.showSnackbar()
    } else{
      localStorage.setItem("admin", this.usuario)
      this.router.navigate(['admin']);
    }
  }

  showSnackbar(){
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
}
