import { Component, OnInit } from '@angular/core';
import { Iproject } from '../../model/project.interface';
import { ProjectService } from '../../services/project/project.service';
import { Router } from '@angular/router';
import { ImagesService } from '../../services/images/images.service'
import { VideoService } from 'src/app/services/video/video.service';

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.css']
})
export class DossierComponent implements OnInit {

  imageNames: String[] = [];
  videoNames: String[] = [];
  localVideosCounter = 0;
  projects: Iproject[] = [];
  id: number = 0;
  url: string = '';

  constructor(
    private projectService: ProjectService,
    private route: Router,
    private imageService: ImagesService,
    private videoService: VideoService) {
    this.projectService.getPorject().subscribe(
      (data: any[]) => {

        data.forEach(element => {
          this.projects.push(element)
        });
        this.sortByOrder();
        this.decreaseOrderOfPorjects();
      }, err => {

      })

  }


  ngOnInit() { }

  updateItem(index) {
    this.id = this.projects[index].id
    this.url = '/Configure_Project/';
    this.url += this.id.toString();
    this.route.navigate([this.url]);
  }

  removeItem(index) {
    if (confirm("Are you sure you want to delete this project")) {
      this.projectService.deleteProject(this.projects[index].id).subscribe(
        data => {
          let aux = this.projects;
          delete aux[index];
          this.projects = [];
          aux.forEach(element => {
            this.projects.push(element);
          });

        }, err => {
          console.log(err);
        })
    }
  }

  downOrder(index) {
    if (index < this.projects.length - 1) {
      console.log("bajandaaaaaaaaaaaaaaaaaaaa")
      let temporal = this.projects[index + 1]
      this.projects[index + 1] = this.projects[index]
      this.projects[index + 1].order += 1
      this.projects[index] = temporal
      this.projects[index].order -= 1
    }
    this.projectService.upgradeProject(this.projects[index]).subscribe(
      data => {

      }, err => {

      });
    this.projectService.upgradeProject(this.projects[index + 1]).subscribe(
      data => {

      }, err => {

      });
  }

  upOrder(index) {
    if (index > 0) {
      console.log("subiendoooooooooo")
      let temporal = this.projects[index - 1]
      this.projects[index - 1] = this.projects[index]
      this.projects[index - 1].order -= 1
      this.projects[index] = temporal
      this.projects[index].order += 1
    }
    this.projectService.upgradeProject(this.projects[index]).subscribe(
      data => {

      }, err => {

      });
    this.projectService.upgradeProject(this.projects[index - 1]).subscribe(
      data => {

      }, err => {

      });
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

  increaseOrderOfPorjects(){
    for(let i = 0; i < this.projects.length; i++){
      this.projects[i].order += 1;
      this.projectService.upgradeProject(this.projects[i]).subscribe(
        data => {
  
        }, err => {
  
        });
    }
  }

  decreaseOrderOfPorjects(){
    for(let i = 0; i < this.projects.length; i++){
      if(this.projects[i].order == 0){ 
        //if already exist a project whit 0 order the do nothing
        return
      }
    }
    //else decrease the order of the projects
    for(let i = 0; i < this.projects.length; i++ ){
      this.projects[i].order -= 1;
      this.projectService.upgradeProject(this.projects[i]).subscribe(
        data => {
  
        }, err => {
  
        });
    }
  }
}