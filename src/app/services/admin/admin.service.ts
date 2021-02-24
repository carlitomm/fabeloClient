import { Injectable } from '@angular/core';
import { Iadmin } from '../../model/admin.interface'
import { HttpClient } from '@angular/common/http';
import {Observable, from} from 'rxjs'
import { CookieService } from 'ngx-cookie-service'
import  config  from '../../../assets/config.json'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  postId;
  private isUserLoggedIn;
  private username;
  server: string;

  constructor(private http: HttpClient ,private cookie: CookieService) { 
    this.isUserLoggedIn = false;
    this.server = config.url;
  }
 

  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
    if (this.cookie.get('user'))
      this.isUserLoggedIn = true;
    return this.isUserLoggedIn;
  }
  
  upgradeAdmin(admin: Iadmin){
    return this.http.put<Iadmin>(this.server+'/admin/0', admin)
    
  }

  createAdmin(admin: Iadmin){
    this.http.post<Iadmin>(this.server+'/admin', admin)
    .subscribe(data => {
            this.postId = data.id;})
  }

  getAdmin(): Observable<Iadmin>{
    return this.http.get<Iadmin>(this.server+'/admin/0');
  }

  login(user, pass){
    return this.http.post(this.server+'/admin/login',{username:user, pass:pass});
  }
}
