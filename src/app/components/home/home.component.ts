import { Component, OnInit } from '@angular/core';
import { Parallax } from 'parallax-js';
import { AdminService } from '../../services/admin/admin.service'
import { Iadmin } from '../../model/admin.interface'
import { Iproject } from '../../model/project.interface';
import { ProjectService } from '../../services/project/project.service';
import { Router } from '@angular/router';
import { ImagesService } from 'src/app/services/images/images.service';
import config from '../../../assets/config.json'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects: Iproject[] = [];
  id: number = 0;
  url: string = '';
  postId;
  imageNames: any[] = [];
  server: string;
  desorganizer: number[] = [];
  imagesLoaded:boolean = false;

  admin: Iadmin = {
    id: 0,
    name: '',
    age: 0,
    email: 'string',
    address: 'string',
    about: '',
    phone: 'string',
    cellPhone: 'string',
    allias: 'string',
    username: 'admin',
    password: '1234'
  };

  constructor(
    private adminService: AdminService,
    private projectService: ProjectService,
    private route: Router,
    private imageService: ImagesService) {
    this.server = config.url;
    this.adminService.getAdmin().subscribe(
      data => {
        this.admin = data;
      })
    this.projectService.getPorject().subscribe(
      datas => {
        this.projects = datas;
        
        this.GetProjectsFirstImages()
        for (let i = 0; i < this.projects.length; i++) {
          this.desorganizer.push(this.getRandomNumber())
        }

      }, err => {

      })
  }

  ngOnInit() { }

  getRandomNumber(): number {
    let random_number = Math.floor(Math.random() * 8) + 2;
    return random_number;
  }

  GetProjectsFirstImages() {
    let i = 0
    this.projects.forEach(element => {
      this.imageService.getImagesByProject(element.id).subscribe(
        (data:any) => {
          i++;
          this.imageNames.push({id:data.id,name:data.name[0]});
          if(this.projects.length >= i){
            this.imagesLoaded = true;
          }
            
        }, err => {

        })
    });

    

  }

  showProjectDetails(id) {
    this.id = id
    this.url = '/details/';
    this.url += this.id.toString();
    this.route.navigate([this.url]);
  }

  sortByOrder() {
    for (let y = 0; y < this.projects.length; y++) {
      for (let i = 0; i < this.projects.length - 1; i++) {
        if (this.projects[i].order > this.projects[i + 1].order) {
          let temporal = this.projects[i]
          this.projects[i] = this.projects[i + 1]
          this.projects[i + 1] = temporal
        }
      }
    }
  }

  getImageById(id){
    let data: string = '';
    data += id;
    return this.imageNames.find(val => val.id === data)
  }
}
