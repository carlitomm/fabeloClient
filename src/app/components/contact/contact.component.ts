import { Component, OnInit } from '@angular/core';
import { Parallax } from 'parallax-js';
import { AdminService } from '../../services/admin/admin.service'
import { Iadmin } from '../../model/admin.interface'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

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
  constructor(private adminService: AdminService) {
    this.adminService.getAdmin().subscribe(
      data => {
        this.admin = data;
      })
  }

  ngOnInit() {

  }

}
