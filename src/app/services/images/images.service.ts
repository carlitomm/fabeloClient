import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iimage } from 'src/app/model/images.interface';
import { Observable } from 'rxjs';
import  config  from '../../../assets/config.json'

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  server: string;
  constructor(private http:HttpClient) {
    this.server = config.url;
   }

  setImage(formData){
    return this.http.post(this.server+'/images/1/uploadImage', formData);
  }

  setDBImage(data:Iimage){
    return this.http.post(this.server+'/images/', data);
  }

  getImagesByProject(id:number){
    return this.http.get(this.server+'/images/'+id);
  }

  getImageFile(id: number, name: string){
    return this.http.get(this.server+'/images/getImage/' + id + '/' + name);
  }

  deleteImage(id){
    return this.http.delete(this.server+'/images/' + id);
  }

  deleteImageFile(id_project, image_name){
    return this.http.post(this.server+'/images/deleteImageFile', {id_project: id_project,image_name:image_name});
  }


}
