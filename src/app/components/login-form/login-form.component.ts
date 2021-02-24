import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
//import * as bcrypt from 'bcrypt'
import { AdminService } from 'src/app/services/admin/admin.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  constructor(  
    private router: Router,
    private cookie: CookieService,
    private adminService: AdminService
  ) {

  }

  ngOnInit() {
  }

  loginUser(e) {
    e.preventDefault();
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;

    this.adminService.login(username,password).subscribe(
      data=>{
        this.adminService.setUserLoggedIn();
        this.cookie.set('user', 'true');
        this.router.navigate(['/dashboard']);
      },err=>{
        alert("Se ha producido un error")
      }
    )
    

  }
}
