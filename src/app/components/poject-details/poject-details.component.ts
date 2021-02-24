import { Component, OnInit } from '@angular/core';
import { Iproject } from '../../model/project.interface';
import { ProjectService } from '../../services/project/project.service'
import { ActivatedRoute } from '@angular/router'
import { AdminService } from '../../services/admin/admin.service'
import { Iadmin } from '../../model/admin.interface'
import { ImagesService } from '../../services/images/images.service'
import { DomSanitizer } from '@angular/platform-browser';
import { ModalService } from 'src/app/_modal';
import { VideoService } from 'src/app/services/video/video.service';
import config from '../../../assets/config.json'

@Component({
  selector: 'app-poject-details',
  templateUrl: './poject-details.component.html',
  styleUrls: ['./poject-details.component.css']
})
export class PojectDetailsComponent implements OnInit {

  id: number;
  zoomImage: any;
  server: string;

  project: Iproject = {
    titulo: '',
    id: null,
    descripcion: '',
    fecha: null,
    dimensiones: '',
    material: '',
    images: [],
    videos: [],
    order: 0,
    videoDimensions: ''
  };

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
  imageNames: any[] = [];
  videosUrl: String[] = [];
  videoNames: String[] = [];

  isMaterial: boolean = false;
  isdimenssion: boolean = false;

  constructor(
    private service: ProjectService,
    private activatedRute: ActivatedRoute,
    private adminService: AdminService,
    private imageService: ImagesService,
    private videoService: VideoService,
    private _sanitizer: DomSanitizer,
    public modalService: ModalService) {
    this.server = config.url;
    this.adminService.getAdmin().subscribe(
      data => {
        this.admin = data;
      })
    this.id = this.activatedRute.snapshot.params.id
    this.service.getPorjectbyid(this.id).subscribe(
      data => {
        this.project = data;
        if (this.project.dimensiones != "")
          this.isdimenssion = true;
        if (this.project.material != "")
          this.isMaterial = true;
        let day = this.project.fecha
        this.project.images.forEach(element => {
          this.imageNames.push(element.nombre)
        });
        let localVideosCounter = 0;
        for (let i = 0; i < this.project.videos.length; i++) {
          if (this.project.videos[i].url.length == 0)
            localVideosCounter += 1;
        }
        this.videoService.getVideoByProject(this.project.id).subscribe(
          data => {
            for (let i = 0; i < localVideosCounter; i++) {
              this.videoNames.push(data[i])
            }
          }, err => {

          })
      }, err => {

      })
  }

  ngOnInit() {

  }

  getVideoIframe(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openModal(id: string, actual: any) {
    this.zoomImage = actual
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  doNothing(){
    
  }

  replaceURLText(text:string){
    var urlRegex = /(https?:\/\/[^\s]+)/
    return text.replace(urlRegex, function(url){
      var urlClan = url.replace('https://','').replace('http://','');

      return '<a href="'+url+'">'+urlClan.split('/')[0]+'</a>'
    })
  }

}