import { Injectable } from '@angular/core';
import { Ivideo } from '../../model/videos.interface'
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
import  config  from '../../../assets/config.json'

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  server: string;
  constructor(private http: HttpClient) {
    this.server = config.url;
   }

  videos: Ivideo[] = [];
  url: string;
  postId;
  
  createVideo(video : Ivideo){
    this.http.post<Ivideo>(this.server+'/video', video)
    .subscribe(data => {
            this.postId = data.id;})  
  }

  getVideo(): Observable<Ivideo[]>{
    return this.http.get<Ivideo[]>(this.server+'/video');
  }

  getVideobyid(id:number): Observable<Ivideo>{

    this.url = this.server+'/video/'
    this.url += id.toString()

    return this.http.get<Ivideo>(this.url);
  }

  getVideoByProject(id:number){
    return this.http.get(this.server+'/video/'+id);
  }

  upgradeVideo(video : Ivideo){
    this.url = this.server+'/video/';
    this.url += video.id.toString();
    this.http.put<Ivideo>(this.url, video)
    .subscribe(data => {
            this.postId = data.id;})
  }

  deleteVideo(id: number): Observable<any>{

    this.url = this.server+'/video/'
    this.url += id.toString()

    return this.http.delete(this.url);
  }
  
  deleteVideoFile(id_project, video_name){
    console.log(video_name)
    return this.http.post(this.server+'/video/deleteVideoFile', {id_project: id_project, video_name: video_name});
  }

  setVideo(formData){
    console.log("voy a guardar el archivo de video" + formData)
    return this.http.post(this.server+'/video/1/uploadVideo', formData);
  }


}
