import { Component, OnInit } from '@angular/core';
import { Iproject } from '../../model/project.interface';
import { ProjectService } from '../../services/project/project.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Ivideo } from '../../model/videos.interface'
import { isDefined } from '@angular/compiler/src/util';
import { VideoService } from '../../services/video/video.service'
import { Iimage } from '../../model/images.interface'
import { ImagesService } from 'src/app/services/images/images.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FileSelectDirective, FileUploader, FileItem } from 'ng2-file-upload'

@Component({
  selector: 'app-add-project-details',
  templateUrl: './add-project-details.component.html',
  styleUrls: ['./add-project-details.component.css']
})

export class AddProjectDetailsComponent implements OnInit {

  id: number;
  nombre: string;
  url: string;
  newVideo: Ivideo;
  imagesFile: any[] = [];
  videosFile: any[] = [];
  uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/video/1/uploadVideo' });

  attatchmentList: any = [];

  project: Iproject = {
    titulo: 'untitled',
    id: null,
    descripcion: '',
    fecha: new Date(2015, 3, 15),
    dimensiones: '',
    material: '',
    images: [],
    videos: [],
    order: 0,
    videoDimensions: ''
  };

  // isUpdate: boolean = false;
  isCreate: boolean = true;
  isLoading = false;

  constructor(
    private service: ProjectService,
    private activatedRute: ActivatedRoute,
    private videoService: VideoService,
    private imageService: ImagesService,
    private imageCompress: NgxImageCompressService,
    private route: Router
  ) {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attatchmentList.push(JSON.parse(response));
    }

    activatedRute.params
      .subscribe(data => {
        if (data.id) {
          this.id = this.activatedRute.snapshot.params.id
          this.initUpgrade();
        } else {
          // this.isUpdate = false;
          this.isCreate = true;
        }
      });
  }

  initUpgrade() {
    this.service.getPorjectbyid(this.id).subscribe(
      data => {
        this.project = data;
      }, err => {
        console.log(err);
      })
    // this.isUpdate = true;
    this.isCreate = false;
  }

  ngOnInit() { }

  submitProject() {
    this.isLoading = true
    if (this.isCreate) {
      if (this.imagesFile.length == 0) {
        alert("ERROR!, a project can not be created without images");
        return;
      }
      this.service.createProject(this.project)
        .subscribe((data: any) => {
          this.uploadMedia(data);
        }, err => {
          console.log(err);
        });
    } else {
      this.service.upgradeProject(this.project)
        .subscribe((data: any) => {
          this.uploadMedia(data);
        }, err => {
          console.log(err);
        });
    }
  }

  private uploadMedia(data: any) {
    let id = data.identifiers[0].id;
    this.project.id = id;
    let imageformData = new FormData();
    let videoFormData = new FormData();
    for (let i = 0; i < this.imagesFile.length; i++) {
      const element = this.imagesFile[i];
      imageformData.append('files', element);
    }
    imageformData.append('projectId', id.toString())
    this.imageService.setImage(imageformData)
      .subscribe(data => {
        if (this.videosFile.length > 0) {
          for (let i = 0; i < this.videosFile.length; i++) {
            const element = this.videosFile[i];
            videoFormData.append('files', element);
          }
          videoFormData.append('projectId', id.toString())
          this.videoService.setVideo(videoFormData)
            .subscribe(data => {
              this.isLoading = false;
              this.route.navigate(['dashboard'])
            }, err => {
              console.log(err);
            })
        } else {
          this.route.navigate(['dashboard'])
        }
      }, err => {
        console.log(err);
      })
  }

  pushVideo() {
    if (this.nombre != "" && this.url != "") {
      this.newVideo = {
        id: 0,
        nombre: this.nombre,
        url: this.processURL(this.url),
        id_proyecto: this.id
      }
      this.nombre = "";
      this.url = "";
    }
    this.project.videos.push(this.newVideo);
  }

  processURL(url: string) {
    return url.replace("https://youtu.be", "https://www.youtube.com/embed")
  }


  removeVideo(index) {
    this.videosFile.splice(index, 1);
    this.videoService.deleteVideo(this.project.videos[index].id).subscribe(
      data => {
        if (data)
          this.videoService.deleteVideoFile(this.id, this.project.videos[index].nombre).subscribe(
            data => {
              this.project.videos.splice(index, 1)
              alert("video borrado");
            }, err => {

            }
          )
      }, err => {

      })
  }

  removeImageFile(index) {
    this.imagesFile.splice(index, 1);
    this.imageService.deleteImage(this.project.images[index].id)
      .subscribe(data => {
        if (data)
          this.imageService.deleteImageFile(this.id, this.project.images[index].nombre)
            .subscribe(data => {
              this.project.images.splice(index, 1)
              alert("Imagen borrada");
            }, err => {
              console.log(err);
            })
      }, err => {
        console.log(err);
      })
  }



  pushImage(event) {
    if (event.files.length > 0) {
      const file = event.files;
      let stop = false;
      for (let i = 0; i < file.length; i++) {
        const element = file[i];
        const reader = new FileReader();
        reader.readAsDataURL(element);
        reader.onload = () => {
          if (i == file.length - 1)
            stop = true;
          this.compressFile(reader.result as string, element, stop);
        };
      }
    }
  }

  compressFile(image, element, stop) {
    var orientation = -1;
    this.imageCompress.compressFile(image, orientation, 100, 100).then(
      result => {
        let base64 = this.stringToBase64(result);
        if (base64 != "") {
          const imageBlob = this.dataURItoBlob(base64);
          let originalFile = new File([imageBlob], element.name);
          const imageFile = new File([originalFile], element.name, { type: 'image/jpeg' });
          this.imagesFile.push(imageFile);
          this.project.images.push({ id: null, nombre: imageFile.name })
        }
      });
  }

  stringToBase64(data: string) {
    for (let index = 0; index < data.length; index++) {
      const element = data.charAt(index);
      if (element == ',')
        return data.substring(index + 1);
    }
    return "";
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  pushVideoFile(file) {
    const videoFile = new File([file.rawFile], file.name, { type: 'video/mpge' });
    this.videosFile.push(videoFile)
    this.project.videos.push({ id: null, nombre: file.name, url: '', id_proyecto: this.id })
  }

}