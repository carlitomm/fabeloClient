import { Component, OnInit } from '@angular/core';
import { Iadmin } from '../../model/admin.interface'
import { AdminService } from '../../services/admin/admin.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
      }, err => {
        console.log(err);
      })
  }

  ngOnInit() { }

  onUpgradeContact() {
    this.adminService.upgradeAdmin(this.admin).subscribe(
      data => {
        
      }, err => {

      })
  }

}

