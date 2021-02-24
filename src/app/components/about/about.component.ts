import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service'
import { Iadmin } from '../../model/admin.interface'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  admin: Iadmin = {
    id: 0,
    name: 'string',
    age: 0,
    email: 'string',
    address: 'string',
    about: 'string',
    phone: 'string',
    cellPhone: 'string',
    allias: 'string',
    username: 'admin',
    password: '1234'
  };

  constructor(private adminService:AdminService) { 
    this.adminService.getAdmin()
    .subscribe(data => {
      this.admin = data;})
  }

  ngOnInit() {}

  replaceURLText(text:string){
    var urlRegex = /(https?:\/\/[^\s]+)/
    return text.replace(urlRegex, function(url){
      var urlClan = url.replace('https://','').replace('http://','');

      return '<a href="'+url+'">'+urlClan.split('/')[0]+'</a>'
    })
  }

}
